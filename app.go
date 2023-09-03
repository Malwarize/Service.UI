package main

import (
	"changeme/backend"
	"context"
	"encoding/json"
	"golang.org/x/exp/slices"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

type Error struct {
	Error string `json:"Error"`
}

func ErrorDialog(message string) string {
	dataJson, _ := json.Marshal(Error{Error: message})
	return string(dataJson)
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}
func (a *App) Exit() {
	defer a.ctx.Done()
	os.Exit(0)
}
func (a *App) Minimize() {
	runtime.WindowMinimise(
		a.ctx,
	)
}
func (a *App) FetchServices() string {
	services, err := backend.GetServices()
	if err != nil {
		return ErrorDialog(err.Error())
	}
	dataJson, _ := json.Marshal(services)
	return string(dataJson)
}
func (a *App) StopService(name string) string {
	err := backend.StopService(name)
	if err != nil {
		return ErrorDialog(err.Error())
	}
	return "{}"
}
func (a *App) StartService(name string) string {
	err := backend.StartService(name)
	if err != nil {
		return ErrorDialog(err.Error())
	}
	return "{}"
}
func (a *App) RestartService(name string) string {
	err := backend.RestartService(name)
	if err != nil {
		return ErrorDialog(err.Error())
	}
	return "{}"
}
func (a *App) FetchServiceGroup() string {
	groups, err := backend.GetServiceGroups()
	if err != nil {
		return ErrorDialog(err.Error())
	}
	dataJson, _ := json.Marshal(groups)
	return string(dataJson)
}
func (a *App) FetchServicesOfAGroup(category string) string {
	services, err := backend.GetServicesOfAGroup(category)
	if err != nil {
		return ErrorDialog(err.Error())
	}
	dataJson, _ := json.Marshal(services)
	return string(dataJson)
}
func (a *App) AddGroup(category string, description string) string {
	err := backend.AddGroup(category, description)
	if err != nil {
		return ErrorDialog(err.Error())
	}
	return "{}"
}
func (a *App) AddServiceToGroup(category string, name string) string {
	err := backend.AddServiceToGroup(category, name)
	if err != nil {
		return ErrorDialog(err.Error())
	}
	return "{}"
}
func (a *App) CreateService(name string, description string, after string, the_type string, execStart string, workingDirectory string, restart string, wantedBy string, category string) string {
	// validate
	if name == "" {
		return ErrorDialog("name is empty")
	}
	// validate after check if after exists
	services, err := backend.GetServices()
	if err != nil {
		return ErrorDialog(err.Error())
	}
	var i = 0
	for _, s := range services {
		if s.Name == after {
			break
		}
		i++
	}
	if i > len(services) {
		return ErrorDialog("no service with name " + after + " found")

	}

	// validate type
	if slices.Contains(backend.TheTypes, the_type) == false {
		return ErrorDialog("invalid type " + the_type)
	}

	// validate restart
	if slices.Contains(backend.Restarts, restart) == false {
		return ErrorDialog("invalid restart " + restart)
	}

	// validate wantedBy
	if slices.Contains(backend.WantedBys, wantedBy) == false {
		return ErrorDialog("invalid wantedBy " + wantedBy)
	}

	// validate category
	groups, err := backend.GetServiceGroups()
	if err != nil {
		return ErrorDialog(err.Error())
	}
	if _, ok := groups[category]; !ok {
		return ErrorDialog("invalid category " + category)

	}
	// validate workingDirectory
	// check if workingDirectory exists
	if workingDirectory != "" {
		if _, err := os.Stat(workingDirectory); os.IsNotExist(err) {
			return ErrorDialog("workingDirectory " + workingDirectory + " does not exist")

		}
	}
	// validate execStart
	if execStart == "" {
		return ErrorDialog("execStart is empty")

	}

	err = backend.CreateService(name, description, after, the_type, execStart, workingDirectory, restart, wantedBy, category)
	if err != nil {
		return ErrorDialog(err.Error())

	}
	return "{}"
}
func (a *App) EditService(name string, description string, after string, the_type string, execStart string, workingDirectory string, restart string, wantedBy string, category string) string {
	// validate
	if name == "" {
		return ErrorDialog("name is empty")
	}

	// check if service exists

	// validate after check if after exists
	services, err := backend.GetServices()
	if err != nil {
		return ErrorDialog(err.Error())
	}
	var i = 0
	for _, s := range services {
		if s.Name == after {
			break
		}
		i++
	}
	if i > len(services) {
		return ErrorDialog("no service with name " + after + " found")

	}

	// validate type
	if slices.Contains(backend.TheTypes, the_type) == false {
		return ErrorDialog("invalid type " + the_type)
	}

	// validate restart
	if slices.Contains(backend.Restarts, restart) == false {
		return ErrorDialog("invalid restart " + restart)
	}

	// validate wantedBy
	if slices.Contains(backend.WantedBys, wantedBy) == false {
		return ErrorDialog("invalid wantedBy " + wantedBy)
	}

	// validate category
	groups, err := backend.GetServiceGroups()
	if err != nil {
		return ErrorDialog(err.Error())

	}
	if _, ok := groups[category]; !ok {
		return ErrorDialog("invalid category " + category)

	}
	// validate workingDirectory
	// check if workingDirectory exists
	if workingDirectory != "" {
		if _, err := os.Stat(workingDirectory); os.IsNotExist(err) {
			return ErrorDialog("workingDirectory " + workingDirectory + " does not exist")

		}
	}
	// validate execStart
	if execStart == "" {
		return ErrorDialog("execStart is empty")

	}

	err = backend.EditService(name, description, after, the_type, execStart, workingDirectory, restart, wantedBy, category)
	if err != nil {
		return ErrorDialog(err.Error())

	}
	return "{}"
}
func (a *App) FetchServiceFile(name string) string {
	serviceFile, err := backend.GetServiceFile(name)
	if err != nil {
		return ErrorDialog(err.Error())
	}
	dataJson, err := json.Marshal(serviceFile)
	if err != nil {
		return ErrorDialog(err.Error())
	}
	return string(dataJson)
}
func (a *App) DeleteService(name string) string {
	err := backend.DeleteService(name)
	if err != nil {
		return ErrorDialog(err.Error())
	}
	return "{}"
}
func (a *App) DeleteGroup(name string) string {
	err := backend.DeleteGroup(name)
	if err != nil {
		return ErrorDialog(err.Error())
	}
	return "{}"
}
func (a *App) FetchLogsForService(name string) string {
	journalCtlLogs, err := backend.GetJournalctl(name)
	if err != nil {
		return ErrorDialog(err.Error())
	}
	dataJson, err := json.Marshal(journalCtlLogs)
	if err != nil {
		return ErrorDialog(err.Error())
	}
	return string(dataJson)
}

func (a *App) FetchAllLogs() string {
	journalCtlLogs, err := backend.GetAllJournalctl()
	if err != nil {
		return ErrorDialog(err.Error())
	}
	dataJson, err := json.Marshal(journalCtlLogs)
	if err != nil {
		return ErrorDialog(err.Error())
	}
	return string(dataJson)
}
