"use client";

import { useState, useEffect } from "react";
import { useGetCities, useGetCountries } from "@/lib/QueryFunctions";

const useCountryCity = (governorate_id?: number) => {
  const [selectedCountry, setSelectedCountry] = useState<number | null>(governorate_id || null);
  const [cities, setCities] = useState([]);
  const { data: countriesData, isLoading: isLoadingCountries } = useGetCountries();
  const { data: citiesData, isLoading: isLoadingCities } = useGetCities(selectedCountry);

  // Update cities based on the selected country
  useEffect(() => {
    if (selectedCountry && citiesData && !isLoadingCities) {
      setCities(citiesData?.data);
    }
  }, [selectedCountry, citiesData, isLoadingCities]);

  return {
    countries: countriesData?.data,
    cities,
    isLoadingCountries,
    isLoadingCities,
    selectedCountry,
    setSelectedCountry,
  };
};

export default useCountryCity;
