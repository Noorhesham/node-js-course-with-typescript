import { ImageIcon } from "@sanity/icons"
import { FaEllipsisH } from "react-icons/fa"
import { defineField } from "sanity"

import { definePageComponent } from "../definePageComponent"

import { PreviewTrustBar } from "@/schemas/componentSchemas/trustBar/PreviewTrustBar"
import { internalLink } from "@/schemas/fields/linkTypes/internalLink"
import { richImage } from "@/schemas/fields/richImage"

export const trustBar = definePageComponent({
  name: "trustBar",
  title: "Trust Bar",
  description: "A component that displays a list of logos",
  icon: FaEllipsisH,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          {
            title: "Scrolling",
            value: "scrolling",
          },
          {
            title: "Fixed",
            value: "fixed",
          },
        ],
      },
      initialValue: "scrolling",
    }),
    defineField({
      name: "rows",
      title: "Number of rows",
      type: "number",
      initialValue: 1,
      hidden: ({ parent }) => parent?.style !== "scrolling",
    }),
    defineField({
      name: "companies",
      title: "Companies",
      type: "array",
      of: [
        defineField({
          name: "item",
          title: "Item",
          type: "object",
          preview: {
            select: {
              companyName: "company.company.name",
              companyType: "company.companyType",
              logo: "company.logo",
            },
            prepare({ companyName, companyType, logo }) {
              return {
                title: companyType === "company" ? companyName : logo?.alt || "Custom Logo",
              }
            },
          },
          fields: [
            defineField({
              name: "actionType",
              title: "Link Type",
              type: "string",
              initialValue: "internalLink",
              options: {
                list: [
                  { title: "Internal Link", value: "internalLink" },
                ],
              },
            }),
            {
              ...internalLink,
              hidden: ({ value, parent }) => {
                const field = value as { reference: unknown }

                return parent?.actionType !== "internalLink" && !field?.reference
              },
            },
            defineField({
              name: "company",
              title: "Company",
              type: "object",
              fields: [
                defineField({
                  name: "companyType",
                  title: "Company Type",
                  type: "string",
                  initialValue: "company",
                  options: {
                    list: [
                      { title: "Company", value: "company" },
                      { title: "Just a Logo", value: "logo" },
                    ],
                  },
                }),
                defineField({
                  name: "company",
                  title: "Company",
                  type: "reference",
                  to: [{ type: "company" }],
                  hidden: ({ parent }) => parent?.companyType !== "company",
                }),
                {
                  ...richImage,
                  name: "logo",
                  title: "Just a Logo",
                  icon: ImageIcon,
                  hidden: ({ parent }) => parent?.companyType !== "logo",
                },
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      companies: "companies",
    },
    prepare: ({ companies }) => ({
      title: "Trust Bar",
      subtitle: companies?.length ? `${companies.length} companies` : 'No companies added yet',
      media: FaEllipsisH,
      companies
    })
  },
  components: {
    preview: PreviewTrustBar,
  },
})
