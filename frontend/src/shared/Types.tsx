export interface ServiceInfo {
    Name: string;
    Status: string;
    Description: string;
}
export interface Group {
    Category: string;
    Description: string;
    Services: ServiceInfo[];
}
export interface Groups {
    [Category: string]: Group;
}

export interface UnitSection  {
    Description :string
    After       :string
}

export interface ServiceSection {
    Type       :string
    ExecStart       :string
    WorkingDirectory :string
    Restart    :string
}
export interface InstallSection {
    WantedBy :string
}

export interface ServiceFile {
    Unit    :UnitSection
    Service :ServiceSection
    Install :InstallSection
}

export interface JournalLog {
    Timestamp: string;
    Message: string;
}

export interface JournalLogs {
    logs: JournalLog[];
}

export interface AllJournalLog {
    Timestamp: string;
    HostName: string;
    Process:string;
    Message: string;
}

export interface AllJournalLogs{
    logs: AllJournalLog[]; 
}

export interface Config {
    db_file_path: string;
    services_path: string;
}