export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}
