/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/api/mainController/route.ts

import { NextRequest, NextResponse } from 'next/server'

// Define the shape of the response data
interface MainControllerResponse {
  message: string
  timestamp: string
}

// MainController handles the business logic for the homepage interaction
class MainController {
  // Method to handle the button click action
  handleButtonClick(): MainControllerResponse {
    // Simulate some business logic
    const response: MainControllerResponse = {
      message: 'Button was clicked successfully!',
      timestamp: new Date().toISOString(),
    }
    return response
  }
}

const mainController = new MainController()

// Handler for GET requests to /api/mainController
export async function GET(req: NextRequest) {
  try {
    const data = mainController.handleButtonClick()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error in mainController:', error)
    return NextResponse.json(
      { error: 'Failed to process the request.' },
      { status: 500 }
    )
  }
}
