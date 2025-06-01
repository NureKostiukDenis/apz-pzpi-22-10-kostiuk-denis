import type { TranslationMessages } from 'ra-core';

const ua: TranslationMessages = {
    ra: {
        action: {
            edit: "Редагувати",
            delete: "Видалити",
            show: "Показати",
            list: "Список",
            save: "Зберегти",
            create: "Створити",
            cancel: "Скасувати",
            refresh: "Оновити",
            add_filter: "Додати фільтр",
            add: "Додати",
            back: "Назад",
            bulk_actions: "%{smart_count} вибрано",
            clear_array_input: "Очистити список",
            clear_input_value: "Очистити поле",
            clone: "Клонувати",
            confirm: "Підтвердити",
            create_item: "Створити %{item}",
            export: "Експорт",
            remove_filter: "Видалити фільтр",
            remove_all_filters: "Видалити всі фільтри",
            remove: "Видалити",
            search: "Пошук",
            select_all: "Обрати все",
            select_all_button: "Обрати все",
            select_row: "Обрати рядок",
            sort: "Сортувати",
            undo: "Відмінити",
            unselect: "Зняти вибір",
            expand: "Розгорнути",
            close: "Закрити",
            open_menu: "Відкрити меню",
            close_menu: "Закрити меню",
            update: "Оновити",
            move_up: "Перемістити вгору",
            move_down: "Перемістити вниз",
            open: "Відкрити",
            toggle_theme: "Змінити тему",
            select_columns: "Обрати стовпці",
            update_application: "Оновити програму"
        },
        navigation: {
            no_results: "Нічого не знайдено",
            page_out_of_boundaries: "Сторінка %{page} поза межами діапазону",
            page_rows_per_page: "Рядків на сторінці:",
            no_filtered_results: "Застосовані фільтри не дали результатів",
            clear_filters: "Очистити фільтри",
            no_more_results: "Більше немає результатів",
            page_out_from_end: "Досягнуто кінця списку",
            page_out_from_begin: "Досягнуто початку списку",
            page_range_info: "%{offsetBegin}-%{offsetEnd} з %{total}",
            partial_page_range_info: "%{offsetBegin}-%{offsetEnd} з більше ніж %{offsetEnd}",
            current_page: "Сторінка %{page}",
            page: "Сторінка:",
            first: "На початок",
            last: "В кінець",
            next: "Вперед",
            previous: "Назад",
            skip_nav: "Пропустити навігацію"
        },
        boolean: {
            true: "Так",
            false: "Ні",
            null: "Пусто"
        },
        page: {
            create: "Створити %{name}",
            dashboard: "Панель керування",
            edit: "Редагування %{name} #%{recordRepresentation}",
            error: "Сталася помилка",
            list: "Список %{name}",
            loading: "Завантаження...",
            not_found: "Не знайдено",
            show: "Перегляд %{name} #%{recordRepresentation}",
            empty: "Ще немає записів.",
            invite: "Запросити",
            access_denied: "Доступ заборонено",
            authentication_error: "Помилка автентифікації"
        },
        input: {
            file: {
                upload_several: "Перетягніть файли для завантаження, або натисніть для вибору.",
                upload_single: "Перетягніть файл для завантаження, або натисніть для вибору."
            },
            image: {
                upload_several: "Перетягніть зображення для завантаження, або натисніть для вибору.",
                upload_single: "Перетягніть зображення для завантаження, або натисніть для вибору."
            },
            references: {
                all_missing: "Не вдалося завантажити всі пов'язані записи.",
                many_missing: "Не вдалося завантажити деякі пов'язані записи. Перевірте консоль.",
                single_missing: "Не вдалося завантажити пов'язаний запис. Перевірте консоль."
            },
            password: {
                toggle_visible: "Показати пароль",
                toggle_hidden: "Приховати пароль"
            }
        },
        message: {
            about: "Про програму",
            access_denied: "Доступ заборонено. Зверніться до адміністратора.",
            are_you_sure: "Ви впевнені?",
            authentication_error: "Помилка автентифікації. Спробуйте увійти знову.",
            auth_error: "Помилка автентифікації. Спробуйте увійти знову.",
            bulk_delete_content: "Ви впевнені, що хочете видалити %{smart_count} елемент? |||| Ви впевнені, що хочете видалити %{smart_count} елементи? |||| Ви впевнені, що хочете видалити %{smart_count} елементів?",
            bulk_delete_title: "Видалити %{smart_count} елемент |||| Видалити %{smart_count} елементи |||| Видалити %{smart_count} елементів",
            bulk_update_content: "Ви впевнені, що хочете оновити %{smart_count} елемент? |||| Ви впевнені, що хочете оновити %{smart_count} елементи? |||| Ви впевнені, що хочете оновити %{smart_count} елементів?",
            bulk_update_title: "Оновити %{smart_count} елемент |||| Оновити %{smart_count} елементи |||| Оновити %{smart_count} елементів",
            clear_array_input: "Ви впевнені, що хочете очистити весь список?",
            delete_content: "Ви впевнені, що хочете видалити цей запис?",
            delete_title: "Видалити %{name} «%{recordRepresentation}»?",
            details: "Деталі",
            error: "Сталася помилка. Спробуйте ще раз.",
            invalid_form: "Форма містить помилки. Будь ласка, перевірте їх.",
            loading: "Завантаження, будь ласка, зачекайте.",
            no: "Ні",
            not_found: "Сторінку не знайдено або запис було видалено.",
            select_all_limit_reached: "Неможливо вибрати більше %{limit} елементів.",
            unsaved_changes: "Деякі зміни не збережено. Ви впевнені, що хочете їх скасувати?",
            yes: "Так",
            placeholder_data_warning: "Використовуються дані-заповнювачі, оскільки віддалені дані ще не завантажені."
        },
        sort: {
            sort_by: "Сортувати за %{field} (%{order})",
            ASC: "за зростанням",
            DESC: "за спаданням"
        },
        auth: {
            auth_check_error: "Помилка перевірки сесії. Увійдіть знову.",
            user_menu: "Профіль",
            username: "Логін",
            password: "Пароль",
            email: "Електронна пошта",
            sign_in: "Увійти",
            sign_in_error: "Не вдалося увійти. Перевірте логін та пароль.",
            logout: "Вийти"
        },
        notification: {
            updated: "Запис оновлено. |||| %{smart_count} записи оновлено. |||| %{smart_count} записів оновлено.",
            created: "Запис створено.",
            deleted: "Запис видалено. |||| %{smart_count} записи видалено. |||| %{smart_count} записів видалено.",
            bad_item: "Некоректний елемент.",
            item_doesnt_exist: "Елемент не існує.",
            http_error: "Помилка з'єднання з сервером.",
            data_provider_error: "Помилка dataProvider. Перевірте консоль.",
            "i18n_error": "Не вдалося завантажити переклади для обраної мови.",
            canceled: "Дію скасовано.",
            logged_out: "Ви успішно вийшли.",
            not_authorized: "У вас недостатньо прав для виконання цієї дії.",
            application_update_available: "Доступне оновлення програми."
        },
        validation: {
            required: "Це поле є обов'язковим",
            minLength: "Мінімальна довжина %{min} символів",
            maxLength: "Максимальна довжина %{max} символів",
            minValue: "Мінімальне значення %{min}",
            maxValue: "Максимальне значення %{max}",
            number: "Має бути числом",
            email: "Має бути дійсною адресою електронної пошти",
            oneOf: "Має бути одним із: %{options}",
            regex: "Має відповідати формату: %{pattern}"
        },
        saved_queries: {
            label: "Збережені запити",
            query_name: "Назва запиту",
            new_label: "Зберегти поточний запит...",
            new_dialog_title: "Зберегти запит як",
            remove_label: "Видалити збережений запит",
            remove_label_with_name: "Видалити запит «%{name}»",
            remove_dialog_title: "Видалити запит?",
            remove_message: "Ви впевнені, що хочете видалити цей запит зі списку збережених?",
            help: "Фільтруйте список та збережіть цей запит для майбутнього використання"
        }
    },
    resources: {
        item: {
            name: 'Товар |||| Товари',
            fields: {
                id: 'ID',
                rfidTag: 'RFID тэг',
                name: 'Назва товару',
                sectionName: 'Назва секції',
            }
        },
        section: {
            name: 'Секція |||| Секції',
            fields: {
                id: 'ID',
                name: 'Назва секції',
                capacity: 'Місткість',
            }
        },
        gate: {
            name: 'Ворота |||| Ворота',
            fields: {
                id: 'ID',
                code: 'Код воріт',
                type: 'Тип воріт',
                sectionId: 'Секція',
            }
        },
        user: {
            name: "Користувач |||| Користувачі",
            fields: {
                id: "ID",
                name: "Ім'я",
                email: "Email",
                role: "Роль",
                firebaseUid: "Firebase UID",
                password: "Пароль",
                operationType: "Тип операції",
                identifierType: "Тип ідентифікатора",
                identifier: "Ідентифікатор (Email або UID)"
            },
            actions: {
                createUserPageTitle: "Додати користувача",
                createNewUser: "Створити нового користувача",
                assignExistingUser: "Призначити існуючого користувача"
            },
            texts: {
                newUserDetails: "Дані для нового користувача:",
                assignUserDetails: "Дані для призначення існуючого користувача:"
            }
        }
    },
    custom: {
        peakActivity: {
            title: 'Години пікової активності',
            error: 'Помилка при отриманні пікової активності',
            search: 'Пошук',
            start: 'Початкова дата',
            end: 'Кінцева дата',
            warehouse: 'Склад',
            total: 'Загальна кількість активностей',
            hour: 'Година %{hour}: %{count} рухів',
        },
        itemMovement: {
            title: 'Історія переміщень товару',
            error: 'Помилка при отриманні історії переміщень',
            show: 'Показати',
            item: 'Предмет (RFID)',
            itemLoadError: 'Помилка при завантаженні предметів',
            startDate: 'Початкова дата',
            endDate: 'Кінцева дата',
            total: 'Переміщень',
            date: 'Дата',
            from: 'З',
            to: 'До',
        },
        itemsWithoutMovement: {
            title: 'Товари без руху',
            error: 'Помилка при завантаженні звіту безрухомих товарів',
            refresh: 'Оновити',
            days: 'Кількість днів',
            limit: 'Кількість товарів',
            lastMovement: 'Останній рух',
            location: 'Місце',
            found: 'Знайдено: %{count} товарів',
            noItems: 'Жодного товару не знайдено за вказаними критеріями.',
        },
        sectionLoad: {
            title: 'Завантаження складу',
            warehouse: 'Склад',
            sections: 'Секцій',
            load: 'завантаження',
            error: 'Помилка при завантаженні завантаженості секцій',
        },
        sectionMap: {
            error: 'Помилка при завантаженні даних карти секцій',
        },
        sectionCard: {
            items: 'Предмети:',
            gates: 'Ворота:',
            detach: "Відв'язати",
            dialogTitle: 'Управління воротами та секціями',
            selectGate: 'Ворота',
            connectionType: 'Тип підключення',
            attach: 'Приєднати',
            attachSuccess: 'Ворота успішно прикріплені',
            attachError: 'Помилка при прикріпленні воріт',
            detachSuccess: "Ворота успішно від'єднані",
            detachError: "Помилка при від'єднанні",
            selectGateWarning: 'Оберіть ворота і тип підключення',
        },
        menu: {
            map: 'Карта складу',
            sectionLoad: 'Навантаження на секції',
            itemHistory: 'Історія переміщень',
            itemIdle: 'Неактивні товари',
            peakTime: 'Піковий час',
            settings: 'Налаштування',
        },
        common: {
            notAvailable: 'Н/Д',
        },
        settings: {
            pageTitle: "Налаштування",
            language: {
                title: "Мова інтерфейсу",
                selectLabel: "Оберіть мову",
                currentLanguage: "Поточна мова"
            },
            backup: {
                title: "Резервне копіювання",
                backupSettingsButton: "Резервна копія налаштувань",
                backupDataButton: "Резервна копія даних",
                lastBackupInfo: "Останнє копіювання: %{date}"
            },
            settingsEI: {
                title: "Експорт/Імпорт Налаштувань",
                exportButton: "Експортувати налаштування",
                importButton: "Імпортувати налаштування"
            },
            dataEI: {
                title: "Експорт/Імпорт Даних",
                exportButton: "Експортувати дані",
                importButton: "Імпортувати дані"
            },
            notifications: {
                languageChanged: "Мову змінено на %{lang}",
                backupSettings: {
                    started: "Розпочато резервне копіювання налаштувань...",
                    success: "Резервне копіювання налаштувань успішно завершено.",
                    error: "Помилка під час резервного копіювання налаштувань."
                },
                backupData: {
                    started: "Розпочато резервне копіювання даних..."
                },
                exportSettings: {
                    started: "Розпочато експорт налаштувань..."
                },
                importSettings: {
                    fileSelected: "Обрано файл для імпорту налаштувань: %{fileName}"
                },
                exportData: {
                    started: "Розпочато експорт даних..."
                },
                importData: {
                    fileSelected: "Обрано файл для імпорту даних: %{fileName}"
                }
            }
        },
        roles: {
            user: "Користувач",
            staff: "Співробітник",
            admin: "Адміністратор"
        },
        identifierTypes: {
            email: "Email",
            firebaseUid: "Firebase UID"
        },
        notifications: {
            userCreated: "Нового користувача успішно створено!",
            userAssigned: "Існуючого користувача успішно призначено!",
            createUserError: "Не вдалося створити користувача.",
            assignUserError: "Не вдалося призначити користувача.",
            errorPrefix: "Помилка: %{message}"
        },

    }
};

export default ua;
