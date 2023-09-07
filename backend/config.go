package backend

import (
	"encoding/json"
	"os"
)

var ConfigPath = "/home/xorbit/Desktop/.ServiceUiConf.json"

type Config struct {
	DbFilePath   string `json:"db_file_path"`
	ServicesPath string `json:"services_path"`
}

var config *Config

func LoadConfig() error {
	// open config file
	content, err := os.ReadFile(ConfigPath)
	if err != nil {
		return err
	}
	err = json.Unmarshal(content, &config)
	if err != nil {
		return err
	}
	return nil
}

func Init() error {
	content, err := json.Marshal(Config{
		DbFilePath:   "/home/xorbit/Desktop/.ServiceUiDb.json",
		ServicesPath: "/home/xorbit/Desktop/",
	})
	if err != nil {
		return err
	}
	err = os.WriteFile(ConfigPath, content, 0644)
	if err != nil {
		return err
	}
	return nil
}

func SaveConfig() error {
	content, err := json.Marshal(config)
	if err != nil {
		return err
	}
	err = os.WriteFile(ConfigPath, content, 0644)
	if err != nil {
		return err
	}
	return nil
}

func SetConfig(c Config) {
	config = &c
}

func GetConfig() *Config {
	_, err := os.Stat(ConfigPath)
	if os.IsNotExist(err) {
		err = Init()
		if err != nil {
			panic(err)
		}
	}
	if config == nil {
		err = LoadConfig()
		if err != nil {
			panic(err)
		}
	}
	return config
}

func EditConfig(DbFilePath string, ServicesPath string) error {
	config.DbFilePath = DbFilePath
	config.ServicesPath = ServicesPath
	err := SaveConfig()
	if err != nil {
		return err
	}
	return SaveConfig()
}
