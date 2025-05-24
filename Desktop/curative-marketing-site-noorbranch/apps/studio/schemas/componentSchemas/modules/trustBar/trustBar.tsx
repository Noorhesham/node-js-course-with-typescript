import { FaEllipsisH } from "react-icons/fa"
import { defineField } from "sanity"

import { definePageComponent } from "../../definePageComponent"
import { PreviewTrustBar } from "./PreviewTrustBar"

export const trustBar = definePageComponent({
  name: "trustBar",
  title: "Trust Bar",
  description: "A component that displays a list of logos",
  icon: FaEllipsisH,
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          {
            title: "Grid",
            value: "grid",
          },
          {
            title: "Scrolling",
            value: "scrolling",
          },
        ],
      },
      initialValue: "grid",
    }),
    defineField({
      name: "rows",
      title: "Number of rows",
      type: "number",
      initialValue: 1,
      hidden: ({ parent }) => parent?.variant !== "scrolling",
    }),
    defineField({
      name: "companies",
      title: "Companies",
      type: "array",
      of: [{
        type: "reference",
        to: [{ type: "company" }]
      }],
      validation: Rule => Rule.min(1).error('At least one company is required'),
    }),
  ],
  preview: {
    select: {
      companies: 'companies'
    }
  },
  components: {
    preview: PreviewTrustBar,
  },
})
