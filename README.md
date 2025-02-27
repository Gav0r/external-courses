# External Front-End course

## Задания и теоретическая база

Все необходимые материалы с примерами кода, а также задания размещены в соответствующих разделах на [WebPurple-Learn](https://webpurple.github.io/learn/).

## Необходимое ПО

-   [NodeJS (LTS)](https://nodejs.org/en/);
-   [Git](https://git-scm.com/).

## Начало работы.

1. Создаем аккаунт в github, логинимся;
2. Fork'аем репозиторий с помощью кнопки "Fork" справа вверху;
3. Переходим на страницу Fork'нутого репозитория на своем аккаунте;
4. В настройках репозитория добавляем к репозиторию тренеров (Settings -> Collaborators);
5. Открываем терминал `git bash` в директории на локальном компьютере, где будет располагаться проект;
6. Клонируем свою копию репозитория на компьютер с помощью команды в терминале `git clone <url репозитория.git>` (url репозитория  можно скопировать из адресной строки или, нажав кнопку "clone or dowload", скопировать оттуда);
7.  Устанавливаем модули с помощью команды `npm install`.

## Flow

В директории `src` размещены каталоги соответствующие темам практических работ. Каждая практическая работа выполняется в отдельной ветке.

Внутри директории, соответствующей теме практической работы, должны размещаться `.js`, `.html`, `.css`-файлы с выполненным заданием. Изначально директория содержит только файл README.md, в котором содержится описание для практической работы.

**Каждое задание в практической работе должно быть выполнено в отдельном файле, который называется по имени задания, прим. `task-01.js`(`task-01.html`), где `01` - номер задания.**

Если практическая работа подразумевает выполнение **только одного** задания, файл следует назвать `task.js`(`task.html`).

**Для заданий `.js`:**

**Функция, являющаяся решением задания, должна быть экспортирована из файла решения с помощью инструкции `module.exports = <имя_функции>`.**

**Для заданий `.html`/`.css`:**

**HTML и CSS тестируется без каких-либо изменений.**

**Для того, чтобы протестировать CSS нужно описать его в теге `<style />` и/или подключить `.css`-файл(ы) в HTML-документ соответствующего задания**.

Для выполнения практической работы необходимо создать ветку (название соответствует теме практической работы) с помощью команды `git checkout -b <название ветки>` (переход в ветку осуществляется той же командой без ключа `-b`).

После выполнения задания необходимо выполнить _commit_ изменений с помощью команды `git commit -a -m "<комментарий>"`, после чего отправить изменения на GitHub с помощью команды `git push origin <название ветки>`.

На GitHub необходимо сделать _pull request_ ветки задания в ветку `master`, а также запросить ревью у тренера (request review).

Для корректной работы автоматической проверки тестов и линтера необходимо настроить Travis CI, краткое руководство по этому процессу представлено в конце руководства.

В случае подтверждения от тренера и успешного выполнения тестов тренеру необходимо подтвердить перенос кода из задания в ветку `master`. Успешно влитое ревью означает успешно завершённое задание. Таким образом, к концу обучения в репозитории должно быть 14 закрытых _pull request_, а также код всех выполненных заданий, распределённый по директориям, соответствующим темам, должен находиться в ветке `master`.

## Тесты и линтер

Для предварительной проверки правильности выполнения заданий используется система тестов, а для проверки правильности форматирования и оформления кода используется линтер. Тесты (если они есть) и линтер запускаются локально при выполнении _commit_, а также на стороне GitHub при создании _pull request_.

Для самопроверки тесты можно запустить из корневой папки командой `npm test`, линтер -  `npm run lint`

В случае, если необходимо игнорировать замечания линтера, можно воспользоваться директивой отключения линтера `eslint-disable-line` (не рекомендуется). Директива оформляется в виде комментария в конце необходимой строки, после директивы лучше указать конкретное правило, которое нужно отключить, чтобы не упустить других замечаний.

```javascript
console.log(a); // eslint-disable-line
console.log(b); // eslint-disable-line no-console
```

### Дополнения

Все интересующие вопросы могут быть заданы тренеру, ниже представлено дополнение к некоторым моментам руководства в виде пошагового алгоритма.

### Создание и работа с Pull request и добавление тренера

Необходимо перейти на страницу своего репозитория на GitHub, кликнуть по пункту "Pull Request" в верхнем меню, далее нажать на кнопку "New pull request".

Слияние веток происходит по направлению, указанному стрелками в интерфейсе создания _pull request_, слева должна быть выбрана ветка "master" **вашего репозитория**, справа - ветка с практической работой, отправляемой на проверку.

После выбора веток в интерфейсе и нажатия кнопки *Create pull request* будет представлена форма создания _pull request_, в которой необходимо задать заголовок, соответствующий теме практической работы, а в поле комментария **необходимо более развёрнуто описать проделанную работу** и/или добавить текст задания. После заполнения формы необходимо нажать кнопку "Create pull request", после чего браузер выполнит перенаправление на страницу созданного _pull request_.

В случае, если тренер оставил замечания к _pull request_ и не зачёл практическую работу, необходимо исправить замечания и выполнить _push_ изменений в соответствующую ветку, после чего ответить на комментарии тренера, где описать результат проделанной работы.

Когда тренер зачёл практическую работу и все проверки тестов и линтера были выполнены, становится активной (зелёной) кнопка "Merge pull request", по нажатию на которую можно влить изменения из ветки практической работы в ветку _master_, что означает сдачу практической работы.

##### Подробнее про работу с Github тут -  [Как создать ветку, коммит, pull request с домашней работой в Github](https://github.com/WebPurple/external-courses/blob/master/how-to/how-to-do-homework.md) 

## Настройка автоматических проверок теста и линтера

Настройка проверок тестов и линтера производится после того, как репозиторий скопирован в профиль.
Необходимо зайти на [travis-ci.com](https://www.travis-ci.com/), авторизоваться через аккаунт GitHub, в списке репозиториев нажать на плюс, в открывшемся интерфейсе выбрать свой репозиторий и перевести соответствующий переключатель в положение "активно" (зелёный цвет).

## Style-guide
Хорошая практика, особенно на начальных этапах, - придерживаться руководству по стилю программирования. Одним из таких руководств является [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), с ним необходимо ознакомиться перед началом курса. Так же в заданиях установлен линтер от Airbnb, который будет проверять код на соответствие данным правилам и подсказывать что необходимо исправить.

## Среда разработки

Для разработки вам понадобится [VS Code](https://code.visualstudio.com/download). 

Необходимо установить следующие расширения:
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [CSS Formatter](https://marketplace.visualstudio.com/items?itemName=aeschli.vscode-css-formatter)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Опционально:
- [Git lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [TabNine - AI Assistant](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode)
- [Code runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)


Далее установите следующую конфигурацию VS Code: (F1 -> начните вводить `Open setting (JSON)`) и вставьте/добавьте конфигурацию ниже: 

```json
{
  "files.autoSave": "onFocusChange",
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "[css]": {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "aeschli.vscode-css-formatter",
  },
  "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true,
  },
}
```

## Feedback

Замечания и пожелания можно оформить в виде [Issues](https://github.com/webpurple/external-courses/issues) в этом репозитории.
