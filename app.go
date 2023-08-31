package main

import (
	"changeme/backend"
	"context"
	"encoding/json"
	"fmt"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"os"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}
func (a *App) Exit() {
	defer a.ctx.Done()
	os.Exit(0)
}
func (a *App) Minimize() {
	fmt.Println("Minimize")
	runtime.WindowMinimise(
		a.ctx,
	)
}
func (a *App) FetchServices() string {
	services, _ := backend.GetServices()
	dataJson, _ := json.Marshal(services)
	return string(dataJson)
}
func (a *App) StopService(name string) {
	err := backend.StopService(name)
	if err != nil {
		fmt.Println(err)
	}
}
func (a *App) StartService(name string) {
	err := backend.StartService(name)
	if err != nil {
		fmt.Println(err)
	}
}
func (a *App) RestartService(name string) {
	err := backend.RestartService(name)
	if err != nil {
		fmt.Println(err)
	}
}
func (a *App) FetchServiceGroup() string {
	groups, _ := backend.GetServiceGroups()
	dataJson, _ := json.Marshal(groups)
	return string(dataJson)
}
func (a *App) FetchServicesOfAGroup(category string) string {
	services, _ := backend.GetServicesOfAGroup(category)
	dataJson, _ := json.Marshal(services)
	return string(dataJson)
}
func (a *App) AddGroup(category string, description string) {
	err := backend.AddGroup(category, description)
	if err != nil {
		fmt.Println(err)
	}
}
func (a *App) AddServiceToGroup(category string, name string) {
	err := backend.AddServiceToGroup(category, name)
	if err != nil {
		fmt.Println(err)
	}
}
func (a *App) CreateService(name string, description string, after string, the_type string, execStart string, workingDirectory string, restart string, wantedBy string, category string) {
	// validate
	if name == "" {
		fmt.Println("name is empty")
		return
	}
	// validate after check if after exists
	services, err := backend.GetServices()
	if err != nil {
		fmt.Println(err)
		return
	}
	var i = 0
	for _, s := range services {
		if s.Name == after {
			break
		}
		i++
	}
	if i > len(services) {
		fmt.Println("no such service")
		return
	}

	// validate type
	if the_type != "simple" && the_type != "forking" && the_type != "oneshot" && the_type != "dbus" && the_type != "notify" && the_type != "idle" {
		fmt.Println("invalid type", the_type)
		return
	}

	// validate restart
	if restart != "always" && restart != "no" && restart != "on-success" && restart != "on-failure" && restart != "on-abnormal" && restart != "on-watchdog" && restart != "on-abort" {
		fmt.Println("invalid restart", restart)
		return
	}

	// validate wantedBy
	if wantedBy != "multi-user.target" && wantedBy != "graphical.target" && wantedBy != "rescue.target" && wantedBy != "emergency.target" {
		fmt.Println("invalid wantedBy", wantedBy)
		return
	}

	// validate category
	groups, err := backend.GetServiceGroups()
	if err != nil {
		fmt.Println(err)
		return
	}
	if _, ok := groups[category]; !ok {
		fmt.Println("invalid category", category)
		return
	}
	// validate workingDirectory
	// check if workingDirectory exists
	if workingDirectory != "" {
		if _, err := os.Stat(workingDirectory); os.IsNotExist(err) {
			fmt.Println("workingDirectory does not exist", workingDirectory)
			return
		}
	}
	// validate execStart
	if execStart == "" {
		fmt.Println("execStart is empty")
		return
	}

	err = backend.CreateService(name, description, after, the_type, execStart, workingDirectory, restart, wantedBy, category)
	if err != nil {
		fmt.Println(err)
		return
	}
}
func (a *App) EditService(name string, description string, after string, the_type string, execStart string, workingDirectory string, restart string, wantedBy string, category string) {
	// validate
	if name == "" {
		fmt.Println("name is empty")
		return
	}
	// validate after check if after exists
	services, err := backend.GetServices()
	if err != nil {
		fmt.Println(err)
		return
	}
	var i = 0
	for _, s := range services {
		if s.Name == after {
			break
		}
		i++
	}
	if i > len(services) {
		fmt.Println("no such service")
		return
	}

	// validate type
	if the_type != "simple" && the_type != "forking" && the_type != "oneshot" && the_type != "dbus" && the_type != "notify" && the_type != "idle" {
		fmt.Println("invalid type", the_type)
		return
	}

	// validate restart
	if restart != "always" && restart != "no" && restart != "on-success" && restart != "on-failure" && restart != "on-abnormal" && restart != "on-watchdog" && restart != "on-abort" {
		fmt.Println("invalid restart", restart)
		return
	}

	// validate wantedBy
	if wantedBy != "multi-user.target" && wantedBy != "default.target" && wantedBy != "network-online.target" && wantedBy != "sysinit.target" && wantedBy != "basic.target" && wantedBy != "graphical.target" && wantedBy != "shutdown.target" {
		fmt.Println("invalid wantedBy", wantedBy)
		return
	}
	// validate category
	groups, err := backend.GetServiceGroups()
	if err != nil {
		fmt.Println(err)
		return
	}
	if _, ok := groups[category]; !ok {
		fmt.Println("invalid category", category)
		return
	}
	// validate workingDirectory
	// check if workingDirectory exists
	if workingDirectory != "" {
		if _, err := os.Stat(workingDirectory); os.IsNotExist(err) {
			fmt.Println("workingDirectory does not exist", workingDirectory)
			return
		}
	}
	// validate execStart
	if execStart == "" {
		fmt.Println("execStart is empty")
		return
	}

	err = backend.EditService(name, description, after, the_type, execStart, workingDirectory, restart, wantedBy, category)
	if err != nil {
		fmt.Println(err)
		return
	}
}
func (a *App) FetchServiceFile(name string) string {
	serviceFile, err := backend.GetServiceFile(name)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	dataJson, err := json.Marshal(serviceFile)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	return string(dataJson)
}
func (a *App) DeleteService(name string) {
	err := backend.DeleteService(name)
	if err != nil {
		fmt.Println(err)
		return
	}
}
func (a *App) DeleteGroup(name string) {
	err := backend.DeleteGroup(name)
	if err != nil {
		fmt.Println(err)
		return
	}
}
