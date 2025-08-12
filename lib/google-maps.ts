// Google Maps API utilities

import type { google } from "google-maps"

export interface Location {
  lat: number
  lng: number
  address: string
}

export interface RouteStep {
  location: Location
  type: "pickup" | "destination"
  passenger?: string
  estimatedTime?: string
  distance?: string
}

export class GoogleMapsService {
  private static instance: GoogleMapsService
  private directionsService: google.maps.DirectionsService | null = null
  private distanceMatrixService: google.maps.DistanceMatrixService | null = null

  static getInstance(): GoogleMapsService {
    if (!GoogleMapsService.instance) {
      GoogleMapsService.instance = new GoogleMapsService()
    }
    return GoogleMapsService.instance
  }

  async initialize(): Promise<void> {
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      this.directionsService = new window.google.maps.DirectionsService()
      this.distanceMatrixService = new window.google.maps.DistanceMatrixService()
    }
  }

  async optimizeRoute(
    origin: Location,
    destination: Location,
    waypoints: Location[],
  ): Promise<{
    optimizedOrder: number[]
    route: google.maps.DirectionsResult
    totalDistance: string
    totalDuration: string
  }> {
    if (!this.directionsService || !window.google || !window.google.maps) {
      throw new Error("Google Maps not initialized")
    }

    const waypointObjects = waypoints.map((wp) => ({
      location: new window.google.maps.LatLng(wp.lat, wp.lng),
      stopover: true,
    }))

    return new Promise((resolve, reject) => {
      this.directionsService!.route(
        {
          origin: new window.google.maps.LatLng(origin.lat, origin.lng),
          destination: new window.google.maps.LatLng(destination.lat, destination.lng),
          waypoints: waypointObjects,
          optimizeWaypoints: true,
          travelMode: window.google.maps.TravelMode.DRIVING,
          avoidHighways: false,
          avoidTolls: false,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK && result) {
            const route = result.routes[0]
            const totalDistance = route.legs.reduce((total, leg) => total + (leg.distance?.value || 0), 0)
            const totalDuration = route.legs.reduce((total, leg) => total + (leg.duration?.value || 0), 0)

            resolve({
              optimizedOrder: result.routes[0].waypoint_order || [],
              route: result,
              totalDistance: `${(totalDistance / 1609.34).toFixed(1)} miles`,
              totalDuration: `${Math.round(totalDuration / 60)} min`,
            })
          } else {
            reject(new Error(`Directions request failed: ${status}`))
          }
        },
      )
    })
  }

  async calculateDistanceMatrix(
    origins: Location[],
    destinations: Location[],
  ): Promise<google.maps.DistanceMatrixResponse> {
    if (!this.distanceMatrixService || !window.google || !window.google.maps) {
      throw new Error("Google Maps not initialized")
    }

    return new Promise((resolve, reject) => {
      this.distanceMatrixService!.getDistanceMatrix(
        {
          origins: origins.map((o) => new window.google.maps.LatLng(o.lat, o.lng)),
          destinations: destinations.map((d) => new window.google.maps.LatLng(d.lat, d.lng)),
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false,
        },
        (response, status) => {
          if (status === window.google.maps.DistanceMatrixStatus.OK && response) {
            resolve(response)
          } else {
            reject(new Error(`Distance Matrix request failed: ${status}`))
          }
        },
      )
    })
  }

  async geocodeAddress(address: string): Promise<Location> {
    if (!window.google || !window.google.maps) {
      throw new Error("Google Maps not initialized")
    }

    const geocoder = new window.google.maps.Geocoder()

    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location
          resolve({
            lat: location.lat(),
            lng: location.lng(),
            address: results[0].formatted_address,
          })
        } else {
          reject(new Error(`Geocoding failed: ${status}`))
        }
      })
    })
  }
}
