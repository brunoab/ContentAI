"use client"

import { Label, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  count: { label: "Generations" },
  linkedin: { label: "LinkedIn", color: "var(--chart-1)" },
  email: { label: "Email", color: "var(--chart-2)" },
  bio: { label: "Bio", color: "var(--chart-3)" },
} satisfies ChartConfig

type Props = {
  data: { type: string; count: number; fill: string }[]
  total: number
}

export function GenerationsDonut({ data, total }: Props) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full"
      initialDimension={{ width: 100, height: 100 }}
    >
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data}
          dataKey="count"
          nameKey="type"
          innerRadius="55%"
          outerRadius="90%"
          strokeWidth={2}
          stroke="var(--background)"
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 6}
                      className="fill-foreground text-xl font-bold"
                    >
                      {total.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 10}
                      className="fill-muted-foreground text-[9px]"
                    >
                      Total
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
