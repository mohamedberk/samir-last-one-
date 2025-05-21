declare namespace google {
  namespace maps {
    namespace places {
      class Autocomplete {
        constructor(
          inputField: HTMLInputElement,
          options?: AutocompleteOptions
        );
        addListener(eventName: string, handler: () => void): void;
        getPlace(): AutocompletePlace;
      }
      
      interface AutocompleteOptions {
        bounds?: object;
        componentRestrictions?: {
          country: string | string[];
        };
        fields?: string[];
        strictBounds?: boolean;
        types?: string[];
      }
      
      interface AutocompletePlace {
        address_components?: Array<{
          long_name: string;
          short_name: string;
          types: string[];
        }>;
        formatted_address?: string;
        geometry?: {
          location: {
            lat(): number;
            lng(): number;
          };
        };
        name?: string;
        place_id?: string;
        types?: string[];
      }
    }
    
    namespace event {
      function clearInstanceListeners(instance: any): void;
    }
  }
}

interface Window {
  google?: typeof google;
}

// Add type definition for the react-google-autocomplete props
declare module 'react-google-autocomplete' {
  import React from 'react';
  
  interface AutocompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
    apiKey?: string;
    onPlaceSelected: (place: google.maps.places.AutocompletePlace, inputRef?: React.RefObject<HTMLInputElement>, autocomplete?: google.maps.places.Autocomplete) => void;
    options?: google.maps.places.AutocompleteOptions;
    defaultValue?: string;
    language?: string;
  }
  
  const Autocomplete: React.FC<AutocompleteProps>;
  export default Autocomplete;
} 