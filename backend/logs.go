package backend

import (
	"encoding/json"
	"os/exec"
	"strings"
)

type LogEntryOut struct {
	Timestamp string `json:"Timestamp"`
	Message   string `json:"Message"`
}
type LogEntryIn struct {
	Timestamp string `json:"__REALTIME_TIMESTAMP"`
	Message   string `json:"Message"`
}

func GetJournalctl(serviceName string) ([]LogEntryOut, error) {
	// Create a command to run journalctl with the specified service name.
	cmd := exec.Command("journalctl", "-u", serviceName, "--output=json")

	// Run the command and capture its output.
	output, err := cmd.CombinedOutput()
	if err != nil {
		return nil, err
	}

	// Split the output into individual JSON log entries.
	logEntriesJSON := strings.Split(string(output), "\n")

	// Create a slice to store the parsed LogEntry structs.
	var logEntries []LogEntryOut

	// Parse each JSON log entry and append it to the slice.
	for _, logJSON := range logEntriesJSON {
		if logJSON == "" {
			continue
		}
		var logEntry LogEntryIn
		err := json.Unmarshal([]byte(logJSON), &logEntry)
		if err != nil {
			return nil, err
		}
		logEntryO := LogEntryOut{
			Timestamp: logEntry.Timestamp,
			Message:   logEntry.Message,
		}
		logEntries = append(logEntries, logEntryO)
	}

	return logEntries, nil
}

type AllLogEntryOut struct {
	Timestamp string `json:"Timestamp"`
	HostName  string `json:"HostName"`
	Process   string `json:"Process"`
	Message   string `json:"Message"`
}
type AllLogEntryIn struct {
	Timestamp string `json:"__REALTIME_TIMESTAMP"`
	HostName  string `json:"_HOSTNAME"`
	Process   string `json:"SYSLOG_IDENTIFIER"`
	Message   string `json:"MESSAGE"`
}

func GetAllJournalctl() ([]AllLogEntryOut, error) {
	// Create a command to run journalctl with the specified service name.
	cmd := exec.Command("journalctl", "--output=json", "-n", "100")

	// Run the command and capture its output.
	output, err := cmd.CombinedOutput()
	if err != nil {
		return nil, err
	}

	// Split the output into individual JSON log entries.
	logEntriesJSON := strings.Split(string(output), "\n")

	// Create a slice to store the parsed LogEntry structs.
	var logEntries []AllLogEntryOut

	// Parse each JSON log entry and append it to the slice.
	for _, logJSON := range logEntriesJSON {
		if logJSON == "" {
			continue
		}
		var logEntry AllLogEntryIn
		err := json.Unmarshal([]byte(logJSON), &logEntry)
		if err != nil {
			return nil, err
		}
		logEntryO := AllLogEntryOut{
			Timestamp: logEntry.Timestamp,
			HostName:  logEntry.HostName,
			Process:   logEntry.Process,
			Message:   logEntry.Message,
		}
		logEntries = append(logEntries, logEntryO)
	}

	return logEntries, nil
}
