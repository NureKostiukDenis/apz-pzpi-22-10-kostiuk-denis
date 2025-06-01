import type { TranslationMessages } from 'ra-core';
import englishMessages from "ra-language-english";

const en: TranslationMessages = {
    resources: {
        item: {
            name: "Item |||| Items",
            fields: {
                id: "ID",
                rfidTag: "RFID Tag",
                name: "Item Name",
                sectionName: "Section Name"
            }
        },
        section: {
            name: "Section |||| Sections",
            fields: {
                id: "ID",
                name: "Section Name",
                capacity: "Capacity"
            }
        },
        gate: {
            name: "Gate |||| Gates",
            fields: {
                id: "ID",
                code: "Gate Code",
                type: "Gate Type",
                sectionId: "Section"
            }
        },
        user: {
            name: "User |||| Users",
            fields: {
                id: "ID",
                name: "Name",
                email: "Email",
                role: "Role",
                firebaseUid: "Firebase UID",
                password: "Password",
                operationType: "Operation Type",
                identifierType: "Identifier Type",
                identifier: "Identifier (Email or UID)"
            },
            actions: {
                createUserPageTitle: "Add User",
                createNewUser: "Create New User",
                assignExistingUser: "Assign Existing User"
            },
            texts: {
                newUserDetails: "New User Details:",
                assignUserDetails: "Assign Existing User Details:"
            }
        }
    },
    custom: {
        peakActivity: {
            title: "Peak Activity Hours",
            error: "Error fetching peak activity data",
            search: "Search",
            start: "Start Date",
            end: "End Date",
            warehouse: "Warehouse",
            total: "Total activities",
            hour: "Hour %{hour}: %{count} movements"
        },
        itemMovement: {
            title: "Item Movement History",
            error: "Error fetching movement history",
            show: "Show",
            item: "Item (RFID)",
            itemLoadError: "Error loading items",
            startDate: "Start Date",
            endDate: "End Date",
            total: "Movements",
            date: "Date",
            from: "From",
            to: "To"
        },
        itemsWithoutMovement: {
            title: "Items Without Movement",
            error: "Error loading report for immobile items",
            refresh: "Refresh",
            days: "Number of Days",
            limit: "Number of Items",
            lastMovement: "Last Movement",
            location: "Location",
            found: "Found: %{count} items",
            noItems: "No items found for the specified criteria."
        },
        sectionLoad: {
            title: "Warehouse Load",
            warehouse: "Warehouse",
            sections: "Sections",
            load: "load",
            error: "Error loading section load data"
        },
        sectionMap: {
            error: "Error loading section map data"
        },
        sectionCard: {
            items: "Items:",
            gates: "Gates:",
            detach: "Detach",
            dialogTitle: "Gate and Section Management",
            selectGate: "Gate",
            connectionType: "Connection Type",
            attach: "Attach",
            attachSuccess: "Gate successfully attached",
            attachError: "Error while attaching gate",
            detachSuccess: "Gate successfully detached",
            detachError: "Error while detaching gate",
            selectGateWarning: "Please select a gate and connection type"
        },
        menu: {
            map: "Warehouse Map",
            sectionLoad: "Section Load",
            itemHistory: "Item History",
            itemIdle: "Idle Items",
            peakTime: "Peak Time",
            settings: "Settings"
        },
        common: {
            notAvailable: "N/A"
        },
        settings: {
            pageTitle: "Settings",
            language: {
                title: "Interface Language",
                selectLabel: "Select Language",
                currentLanguage: "Current Language"
            },
            backup: {
                title: "Backup",
                backupSettingsButton: "Backup Settings",
                backupDataButton: "Backup Data",
                lastBackupInfo: "Last backup: %{date}"
            },
            settingsEI: {
                title: "Export/Import Settings",
                exportButton: "Export Settings",
                importButton: "Import Settings"
            },
            dataEI: {
                title: "Export/Import Data",
                exportButton: "Export Data",
                importButton: "Import Data"
            },
            notifications: {
                languageChanged: "Language changed to %{lang}",
                backupSettings: {
                    started: "Settings backup started...",
                    success: "Settings backup completed successfully.",
                    error: "Error during settings backup."
                },
                backupData: {
                    started: "Data backup started..."
                },
                exportSettings: {
                    started: "Settings export started..."
                },
                importSettings: {
                    fileSelected: "File selected for settings import: %{fileName}"
                },
                exportData: {
                    started: "Data export started..."
                },
                importData: {
                    fileSelected: "File selected for data import: %{fileName}"
                }
            }
        },
        roles: {
            user: "User",
            staff: "Staff",
            admin: "Administrator"
        },
        identifierTypes: {
            email: "Email",
            firebaseUid: "Firebase UID"
        },
        notifications: {
            userCreated: "New user created successfully!",
            userAssigned: "Existing user assigned successfully!",
            createUserError: "Failed to create user.",
            assignUserError: "Failed to assign user.",
            errorPrefix: "Error: %{message}"
        }
    },
    ra: englishMessages.ra
};

export default en;
