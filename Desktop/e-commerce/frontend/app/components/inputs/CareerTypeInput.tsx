"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import ComboboxForm from "./ComboboxForm";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { ResourceNameProps, Server } from "@/app/main/Server";
import FlexWrapper from "../defaults/FlexWrapper";
import FormInput from "./FormInput";

export const useGetEntities = ({
  key,
  resourceName,
  queryParams,
  enable = true,
  id,
  entityName,
  cache,
}: {
  key: string;
  resourceName: ResourceNameProps;
  queryParams?: URLSearchParams | string;
  enable?: boolean;
  id?: string;
  entityName?: string;
  cache?: number;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [key, queryParams, id],
    queryFn: async () =>
      await Server({ resourceName: resourceName, id, cache: cache || 960000, queryParams, entityName }),
    enabled: enable,
  });
  return { data, isLoading };
};

const CareerInput = ({
  careerType,
  careerSpecialty,
  careerLevel,
  careerTypes,
  loadingCareerTypes,
  onlySpeciality,
  disabled,
  careerLevelString = false,
}: {
  careerType: string;
  careerSpecialty: string;
  careerLevel: string;
  careerTypes: any[];
  loadingCareerTypes?: boolean;
  onlySpeciality?: boolean;
  disabled?: boolean;
  careerLevelString?: boolean;
}) => {
  const form = useFormContext();

  const selectedCareerType = form.getValues(careerType || "career_type_id");

  const { data: careerSpecialties, isLoading: loadingCareerSpecialties } = useGetEntities({
    resourceName: "getEntity",
    key: "career-specialties",
    id: selectedCareerType,
    entityName: "career-specialties",
    enable: !!selectedCareerType,
    queryParams: `with=careerTypes&career_type=${selectedCareerType}&itemsCount=200`,
  });

  const selectedCareerSpecialty = form.getValues(careerSpecialty);

  const { data: careerLevels, isLoading: loadingCareerLevels } = useGetEntities({
    resourceName: "getEntity",
    key: "career-levels",
    entityName: "career-levels",
    id: selectedCareerSpecialty,
    enable: !!selectedCareerSpecialty,
    queryParams: `scope=filter&career_specialty_id=${selectedCareerSpecialty}&career_type=${selectedCareerType}&with=career_type&itemsCount=200`,
  });
  console.log(careerSpecialties);
  
  return (
    <FlexWrapper max={false} className="flex w-full gap-4">
      {!onlySpeciality && (
        <ComboboxForm
          key={`${onlySpeciality}-${careerSpecialty}`}
          name={careerType}
          disabled={loadingCareerTypes}
          label={"Career Type"}
          placeholder={"Select Career Type"}
          options={careerTypes?.data?.map((type: any) => ({
            label: type.title,
            value: type.id,
          }))}
        />
      )}

      {(selectedCareerType || onlySpeciality) && !loadingCareerSpecialties && !loadingCareerTypes && (
        <ComboboxForm
          disabled={loadingCareerSpecialties || disabled || loadingCareerSpecialties || loadingCareerTypes}
          name={careerSpecialty}
          loading={loadingCareerSpecialties || loadingCareerSpecialties || loadingCareerTypes}
          label={"Career Specialty"}
          placeholder={"Select Career Specialty"}
          options={careerSpecialties?.data?.map((specialty: any) => ({
            label: specialty.title,
            value: specialty.id,
          }))}
        />
      )}

      {selectedCareerSpecialty &&
      !loadingCareerTypes &&
      !loadingCareerLevels &&
      !loadingCareerSpecialties &&
      careerLevel !== "" ? (
        careerLevelString ? (
          <FormInput
            disabled={loadingCareerLevels}
            name={careerLevel} className=" w-full"
            label="Career Level"
            placeholder="Select Career Level"
          />
        ) : (
          <ComboboxForm
            disabled={loadingCareerLevels}
            loading={loadingCareerLevels || loadingCareerSpecialties || loadingCareerTypes}
            name={careerLevel}
            label="Career Level"
            placeholder="Select Career Level"
            options={careerLevels?.data.map((level: any) => ({
              label: level.title,
              value: level.id,
            }))}
          />
        )
      ) : null}
    </FlexWrapper>
  );
};

export default CareerInput;
