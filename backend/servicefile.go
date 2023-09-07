package backend

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
)

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

func findServiceUnitFile(serviceName string) (string, error) {
	// Run the systemctl command to get the unit file path
	cmd := exec.Command("systemctl", "show", "-p", "FragmentPath", serviceName)
	output, err := cmd.Output()
	if err != nil {
		return "", err
	}

	// Parse the output to extract the path
	outputStr := strings.TrimSpace(string(output))
	lines := strings.Split(outputStr, "\n")
	for _, line := range lines {
		parts := strings.SplitN(line, "=", 2)
		if len(parts) == 2 && parts[0] == "FragmentPath" {
			return parts[1], nil
		}
	}
	return "", fmt.Errorf("service unit file path not found")
}
func NewServiceFile() ServiceFile {
	return ServiceFile{
		Unit: UnitSection{
			Description: " ",
			After:       " ",
		},
		Service: ServiceSection{
			Type:       " ",
			Exec:       " ",
			WorkingDir: " ",
			Restart:    " ",
		},
		Install: InstallSection{
			WantedBy: "",
		},
	}
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
	f, err := os.Create(GetConfig().ServicesPath + name + ".service")
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
	path, err := findServiceUnitFile(name)
	if err != nil {
		return err
	}
	return os.Remove(path)
}
func getFieldFromLine(line string) string {
	if len(strings.Split(line, "=")) < 2 {
		return " "
	}
	return strings.Split(line, "=")[1]
}
func GetServiceFile(name string) (ServiceFile, error) {
	serviceFile := NewServiceFile()
	servicePath, err := findServiceUnitFile(name)
	if err != nil {
		fmt.Println("error finding service file-------->,", err.Error())
		return serviceFile, err
	}
	data, err := os.ReadFile(servicePath)
	if err != nil {
		return serviceFile, err
	}
	for _, line := range strings.Split(string(data), "\n") {
		if line == "" {
			continue
		}
		if len(strings.Split(line, "=")) < 2 {
			continue
		}
		if strings.Contains(line, "Description") {
			serviceFile.Unit.Description = getFieldFromLine(line)
		}
		if strings.Contains(line, "After") {
			serviceFile.Unit.After = getFieldFromLine(line)
		}
		if strings.Contains(line, "Type") {
			serviceFile.Service.Type = getFieldFromLine(line)
		}
		if strings.Contains(line, "ExecStart") {
			serviceFile.Service.Exec = getFieldFromLine(line)
		}
		if strings.Contains(line, "WorkingDirectory") {
			serviceFile.Service.WorkingDir = getFieldFromLine(line)
		}
		if strings.Contains(line, "Restart") {
			serviceFile.Service.Restart = getFieldFromLine(line)
		}
		if strings.Contains(line, "WantedBy") {
			serviceFile.Install.WantedBy = getFieldFromLine(line)
		}
	}
	return serviceFile, nil
}
