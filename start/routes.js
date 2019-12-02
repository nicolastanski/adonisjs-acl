'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('posts', 'PostController')
  .apiOnly()
  .except(['index', 'show'])
  .middleware(['auth', 'is:(administrator || moderator)'])

Route.get('posts', 'PostController.index')
  .middleware(['auth', '(can:read_posts || read_private_posts)'])

Route.get('posts/:id', 'PostController.show')
  .middleware(['auth', '(can:read_posts || read_private_posts)'])

Route.resource('permissions', 'PermissionController').apiOnly().middleware('auth')

Route.resource('roles', 'RoleController').apiOnly().middleware('auth')
