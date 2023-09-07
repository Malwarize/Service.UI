package backend

import (
	"bytes"
	"fmt"
	"os"
	"os/exec"
	"strings"
)

type ServiceInfo struct {
	Name        string `json:"Name"`
	Status      string `json:"Status"`
	Description string `json:"Description"`
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
func CreateService(name string, description string, after string, the_type string, execStart string, workingDirectory string, restart string, wantedBy string, category string) error {
	// check if the service exists
	if _, err := os.Stat(GetConfig().ServicesPath + name + ".service"); !os.IsNotExist(err) {
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
	_, err = cmd.CombinedOutput()
	if err != nil {
		return err
	}
	cmd = exec.Command("systemctl", "enable", name+".service")
	_, err = cmd.CombinedOutput()
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
	err = serviceFile.Save(name)
	if err != nil {
		return err
	}
	// reload the daemon
	cmd := exec.Command("systemctl", "daemon-reload")
	cmd.Run()
	return nil
}
func DeleteService(name string) error {
	servicePath, err := findServiceUnitFile(name)
	fmt.Println(servicePath)
	if err != nil {
		return err
	}
	// stop the service
	cmd := exec.Command("systemctl", "stop", name+".service")
	_ = cmd.Run()
	// disable the service
	cmd = exec.Command("systemctl", "disable", name+".service")
	_ = cmd.Run()
	fmt.Println("service path: " + servicePath)
	// delete the service file
	err = os.Remove(servicePath)
	if err != nil {
		fmt.Println(err)
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

	// reload the daemon
	cmd = exec.Command("systemctl", "daemon-reload")
	err = cmd.Run()
	if err != nil {
		return err
	}
	return groups.Save()
}
