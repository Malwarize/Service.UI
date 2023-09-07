package backend

import (
	"encoding/json"
	"fmt"
	"os"
)

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
	fp, err := os.Create(GetConfig().DbFilePath)
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
	fp, err := os.Create(GetConfig().DbFilePath)
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
	if _, err := os.Stat(GetConfig().DbFilePath); os.IsNotExist(err) {
		initJson()
	}
	fp, err := os.Open(GetConfig().DbFilePath)
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
	for i, fileService := range fileServices {
		for _, allService := range allServices {
			if fileService.Name == allService.Name {
				fileService.Status = allService.Status
				fileService.Description = allService.Description
				fileServices[i] = fileService
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
