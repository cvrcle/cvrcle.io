import React, { Component } from 'react'
import { render } from 'react-dom'
import { makeMainRoutes } from './routes.js'

const routes = makeMainRoutes()

render(routes, document.getElementById('appRoot'))
