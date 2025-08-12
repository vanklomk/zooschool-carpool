"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import type { Location } from "@/lib/google-maps"
import type { google } from "google-maps"

interface AddressAutocompleteProps {
  onAddressSelect: (location: Location) => void
  placeholder?: string
  className?: string
}

export function AddressAutocomplete({ onAddressSelect, placeholder, className }: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)

  useEffect(() => {
    if (!inputRef.current || !window.google || !window.google.maps || !window.google.maps.places) return

    const autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "us" },
    })

    autocompleteInstance.addListener("place_changed", () => {
      const place = autocompleteInstance.getPlace()

      if (place.geometry && place.geometry.location) {
        const location: Location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address || place.name || "",
        }

        onAddressSelect(location)

        // Clear the input
        if (inputRef.current) {
          inputRef.current.value = ""
        }
      }
    })

    setAutocomplete(autocompleteInstance)

    return () => {
      if (autocompleteInstance) {
        window.google.maps.event.clearInstanceListeners(autocompleteInstance)
      }
    }
  }, [onAddressSelect])

  return <Input ref={inputRef} type="text" placeholder={placeholder || "Enter an address..."} className={className} />
}
