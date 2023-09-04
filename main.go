package main

import (
	"embed"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
	"os"
	"os/exec"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	if os.Geteuid() != 0 {
		println("Error: you need to be root to run this application")
		os.Exit(1)
	}

	// check if systemctl is installed with which
	_, err := exec.LookPath("systemctl")
	if err != nil {
		println("Error: systemctl not found or your system is not supported")
		os.Exit(1)
	}

	// Create an instance of the app structure
	app := NewApp()
	// Create application with options
	err = wails.Run(&options.App{
		Title:  "Service.UI",
		Width:  987,
		Height: 536,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 240, G: 52, B: 52, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
		Frameless:       true,
		CSSDragProperty: "--wails-draggable",
		CSSDragValue:    "drag",
		Linux: &linux.Options{
			WindowIsTranslucent: true,
		},
		MinHeight: 536,
		MinWidth:  987,
	})

	if err != nil {
		println("Error:", err.Error())
	}

}
