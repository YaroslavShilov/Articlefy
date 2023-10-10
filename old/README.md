## Tasks

1. Add Redux
2. Show articles and pagination on the main page. `(GET: /api/article?limit=1&offset=2)`
3. Create filter articles by date (date rage) and search by names.
4. Create a form for adding a new article `(POST: /api/article)`. After adding, the article should be the first.
5. Create the remove button (remove only from redux-store).
6. The title should show the article. Use react-router. You can get the object using `(GET: /api/article/:id)`
7. Add "show/hide comments". You can get comments using `(GET: /api/comment?article=articleId)`
8. Create a form for adding a new comment `(POST: /api/comment)`
9. When you use ajax requests, use a loading indicator

## Команды

- `yarn` установить зависимости
- `yarn start` поднимает локальный dev-сервер вместе с api
- `yarn frontend add package-name` установит package-name в проект frontend

Этот проект использует yarn workspaces, который позволяет хранить несколько приложений в едином репозитории

## API

В backend лежит приложение, реализующее api. Запросы проксируются вебпаком, то есть обратиться к апи можно от корня приложения через /api/

## Требования к коду и используемым библиотекам

Приложение необходимо реализовать на React + Redux. Можно использовать любые библиотеки компонетов или же создавать компоненты самостоятельно
