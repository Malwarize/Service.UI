package backend

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"strings"
)

var ServicesPath = "/etc/systemd/system/"
var DbPath = "/home/xorbit/Desktop/services.json"

type ServiceInfo struct {
	Name        string `json:"Name"`
	Status      string `json:"Status"`
	Description string `json:"Description"`
}

type UnitSection struct {
	Description string `json:"Description"`
	After       string `json:"After"`
}
type ServiceSection struct {
	Type       string `json:"Type"`
	Exec       string `json:"ExecStart"`
	WorkingDir string `json:"WorkingDirectory"`
	Restart    string `json:"Restart"`
}

type InstallSection struct {
	WantedBy string `json:"WantedBy"`
}

type ServiceFile struct {
	Unit    UnitSection    `json:"Unit"`
	Service ServiceSection `json:"Service"`
	Install InstallSection `json:"Install"`
}

func (s *ServiceFile) Save(name string) error {
	// loop over attributes and set them to the service file
	content := "[Unit]\n"
	content += fmt.Sprintf("Description=%s\n", s.Unit.Description)
	content += fmt.Sprintf("After=%s\n", s.Unit.After)
	content += "\n"
	content += "[Service]\n"
	content += fmt.Sprintf("Type=%s\n", s.Service.Type)
	content += fmt.Sprintf("ExecStart=%s\n", s.Service.Exec)
	content += fmt.Sprintf("WorkingDirectory=%s\n", s.Service.WorkingDir)
	content += fmt.Sprintf("Restart=%s\n", s.Service.Restart)
	content += "\n"
	content += "[Install]\n"
	content += fmt.Sprintf("WantedBy=%s\n", s.Install.WantedBy)

	// write the file
	f, err := os.Create(ServicesPath + name + ".service")
	if err != nil {
		return err
	}
	defer f.Close()
	_, err = f.WriteString(content)
	if err != nil {
		return err
	}
	return nil
}

func (s *ServiceFile) Delete(name string) error {
	return os.Remove(ServicesPath + name + ".service")
}
func GetServiceFile(name string) (ServiceFile, error) {
	var serviceFile ServiceFile
	data, err := os.ReadFile(ServicesPath + name + ".service")
	if err != nil {
		return serviceFile, err
	}
	for _, line := range strings.Split(string(data), "\n") {
		if strings.Contains(line, "Description") {
			serviceFile.Unit.Description = strings.Split(line, "=")[1]
		}
		if strings.Contains(line, "After") {
			serviceFile.Unit.After = strings.Split(line, "=")[1]
		}
		if strings.Contains(line, "Type") {
			serviceFile.Service.Type = strings.Split(line, "=")[1]
		}
		if strings.Contains(line, "ExecStart") {
			serviceFile.Service.Exec = strings.Split(line, "=")[1]
		}
		if strings.Contains(line, "WorkingDirectory") {
			serviceFile.Service.WorkingDir = strings.Split(line, "=")[1]
		}
		if strings.Contains(line, "Restart") {
			serviceFile.Service.Restart = strings.Split(line, "=")[1]
		}
		if strings.Contains(line, "WantedBy") {
			serviceFile.Install.WantedBy = strings.Split(line, "=")[1]
		}
	}
	return serviceFile, nil
}

func GetServices() ([]ServiceInfo, error) {
	cmd := exec.Command("systemctl", "list-units", "--type=service", "--all", "--no-pager", "--plain", "--full")
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	err := cmd.Run()
	if err != nil {
		return nil, fmt.Errorf("error running systemctl: %v\n%s", err, stderr.String())
	}

	outputLines := strings.Split(stdout.String(), "\n")

	var services []ServiceInfo

	for _, line := range outputLines {
		if line == "" {
			continue
		}
		parts := strings.Fields(line)
		name := strings.Split(strings.Trim(parts[0], " "), ".")[0]
		if len(name) >= 50 {
			name = name[:50]
		}
		status := strings.Trim(parts[2], " ")
		description := strings.Join(parts[4:], " ")

		if len(parts) >= 4 {
			service := ServiceInfo{
				Name:        name,
				Status:      status,
				Description: description,
			}
			services = append(services, service)
		}
	}

	return services[1 : len(services)-5], nil
}

func StopService(name string) error {
	cmd := exec.Command("systemctl", "stop", name)
	var stderr bytes.Buffer
	cmd.Stderr = &stderr

	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("error running systemctl: %v\n%s", err, stderr.String())
	}

	return nil
}
func StartService(name string) error {
	cmd := exec.Command("systemctl", "start", name)
	var stderr bytes.Buffer
	cmd.Stderr = &stderr

	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("error running systemctl: %v\n%s", err, stderr.String())
	}

	return nil
}
func RestartService(name string) error {
	cmd := exec.Command("systemctl", "restart", name)
	var stderr bytes.Buffer
	cmd.Stderr = &stderr

	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("error running systemctl: %v\n%s", err, stderr.String())
	}
	return nil
}

type Group struct {
	Description string        `json:"Description"`
	Services    []ServiceInfo `json:"Services"`
}

type Groups map[string]Group

func (g Groups) Save() error {
	content, err := json.MarshalIndent(g, "", "  ")
	if err != nil {
		return err
	}
	fp, err := os.Create(DbPath)
	if err != nil {
		return err
	}
	_, err = fp.Write(content)
	if err != nil {
		return err
	}
	defer fp.Close()
	return nil
}

func initJson() {
	// load the default services to system categories
	services, err := GetServices()
	if err != nil {
		return
	}
	systemGroups := make(Groups)

	systemGroups["system"] = Group{
		Description: "System Services",
		Services:    services,
	}

	content, err := json.MarshalIndent(systemGroups, "", "  ")
	if err != nil {
		return
	}
	fp, err := os.Create(DbPath)
	if err != nil {
		return
	}
	_, err = fp.Write(content)
	if err != nil {
		return
	}
	defer fp.Close()
}

func GetServiceGroups() (Groups, error) {
	//	 check if the services.json exists
	if _, err := os.Stat(DbPath); os.IsNotExist(err) {
		initJson()
	}
	fp, err := os.Open(DbPath)
	if err != nil {
		return nil, err
	}
	defer fp.Close()
	var serviceGroups Groups
	err = json.NewDecoder(fp).Decode(&serviceGroups)
	if err != nil {
		return nil, err
	}
	return serviceGroups, nil
}

func getServiceForGroup(category string) ([]ServiceInfo, error) {
	groups, err := GetServiceGroups()
	if err != nil {
		return nil, err
	}
	if group, ok := groups[category]; ok {
		return group.Services, nil
	}
	return nil, fmt.Errorf("no such category")
}

func GetServicesOfAGroup(category string) ([]ServiceInfo, error) {
	fileServices, err := getServiceForGroup(category)
	if err != nil {
		return nil, err
	}
	allServices, err := GetServices()

	if err != nil {
		return nil, err
	}
	for _, fileService := range fileServices {
		for _, allService := range allServices {
			if fileService.Name == allService.Name {
				fileService.Status = allService.Status
			}
		}
	}
	return fileServices, nil
}

func AddGroup(category string, description string) error {
	serviceGroups, err := GetServiceGroups()
	if err != nil {
		return err
	}
	if _, ok := serviceGroups[category]; !ok {
		serviceGroups[category] = Group{
			Description: description,
			Services:    []ServiceInfo{},
		}
		err := serviceGroups.Save()
		if err != nil {
			return err
		}
		return nil
	} else {
		return fmt.Errorf("the category already exists")
	}
}

func AddServiceToGroup(category string, name string) error {
	serviceGroups, err := GetServiceGroups()
	if err != nil {
		return err
	}
	if _, ok := serviceGroups[category]; ok {
		Services := serviceGroups[category].Services
		Services = append(Services, ServiceInfo{
			Name: name,
		})
		serviceGroups[category] = Group{
			Description: serviceGroups[category].Description,
			Services:    Services,
		}
		err := serviceGroups.Save()
		if err != nil {
			return err
		}
		return nil
	} else {
		return fmt.Errorf("the category does not exist")
	}
}

func CreateService(name string, description string, after string, the_type string, execStart string, workingDirectory string, restart string, wantedBy string, category string) error {
	// check if the service exists
	if _, err := os.Stat(ServicesPath + name + ".service"); !os.IsNotExist(err) {
		return fmt.Errorf("the service already exists")
	}
	// check if the category exists
	serviceGroups, err := GetServiceGroups()
	if err != nil {
		return err
	}
	_, ok := serviceGroups[category]
	if !ok {
		return fmt.Errorf("the category does not exist")
	}

	// create the service
	serviceFile := ServiceFile{
		Unit: UnitSection{
			Description: description,
			After:       after,
		},
		Service: ServiceSection{
			Type:       the_type,
			Exec:       execStart,
			WorkingDir: workingDirectory,
			Restart:    restart,
		},
		Install: InstallSection{
			WantedBy: wantedBy,
		},
	}
	err = serviceFile.Save(name)
	if err != nil {
		return err
	}
	// add the service to the category
	err = AddServiceToGroup(category, name)
	// enable the service
	cmd := exec.Command("systemctl", "daemon-reload")
	err = cmd.Run()
	if err != nil {
		return err
	}
	cmd = exec.Command("systemctl", "enable", name+".service")
	err = cmd.Run()
	if err != nil {
		return err
	}
	return nil
}

func EditService(name string, description string, after string, the_type string, execStart string, workingDirectory string, restart string, wantedBy string, category string) error {
	//search for the service
	groups, err := GetServiceGroups()
	if err != nil {
		return err
	}
	// first we need to change category
	for categ, group := range groups {
		for index, service := range group.Services {
			if service.Name == name {
				group.Services = append(group.Services[:index], group.Services[index+1:]...)
				groups[categ] = group
			}
		}
	}
	// add the service to the new category
	NewGroup := groups[category]
	NewGroup.Services = append(groups[category].Services, ServiceInfo{
		Name:        name,
		Description: description,
	})
	groups[category] = NewGroup
	// save the changes
	err = groups.Save()
	if err != nil {
		return err
	}
	// edit the service file
	serviceFile, err := GetServiceFile(name)
	if err != nil {
		return err
	}
	serviceFile.Unit.Description = description
	serviceFile.Unit.After = after
	serviceFile.Service.Type = the_type
	serviceFile.Service.Exec = execStart
	serviceFile.Service.WorkingDir = workingDirectory
	serviceFile.Service.Restart = restart
	serviceFile.Install.WantedBy = wantedBy
	return serviceFile.Save(name)
}

func DeleteService(name string) error {
	// delete the service file
	err := os.Remove(ServicesPath + name + ".service")
	if err != nil {
		return err
	}
	// delete the service from the groups
	groups, err := GetServiceGroups()
	if err != nil {
		return err
	}
	for categ, group := range groups {
		for index, service := range group.Services {
			if service.Name == name {
				group.Services = append(group.Services[:index], group.Services[index+1:]...)
				groups[categ] = group
			}
		}
	}
	return groups.Save()
}

func DeleteGroup(category string) error {
	// check if group have 0 services
	groups, err := GetServiceGroups()
	if err != nil {
		return err
	}
	if _, ok := groups[category]; ok {
		if len(groups[category].Services) == 0 {
			delete(groups, category)
			return groups.Save()
		} else {
			return fmt.Errorf("the category is not empty")
		}
	} else {
		return fmt.Errorf("the category does not exist")
	}
}
