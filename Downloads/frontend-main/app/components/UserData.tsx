"use client";
import React from "react";
import {
  
  ResponsiveContainer,
  YAxis,
  XAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import Heading from "./Heading";
import {  FcBarChart } from "react-icons/fc";
const UserData = ({ stats }: { stats: any }) => {
  console.log(stats);
  const { totalPoints, averagePercentage, totalAttempts, additionalStats, userAttempts } = stats;
  const { maxPoints, minPoints } = additionalStats;
  console.log(userAttempts);
  const data = [
    { name: "Total Points", value: totalPoints },
    { name: "Average Percentage", value: Math.floor(averagePercentage / 100) },
    { name: "Total Attempts", value: totalAttempts },
  ];
  const chartData = userAttempts.map((attempt: any) => ({
    attemptedAt: new Date(attempt.attemptedAt).toLocaleDateString(), // Format date as needed
    percentage: attempt.percentage,
    points: attempt.points,
    totalPoints: attempt.totalPoints,
  }));
  return (
    //@ts-ignore
    <ResponsiveContainer className='relative flex flex-col' width={"100%"} height={380}>
      <Heading icon={<FcBarChart className=" text-3xl md:mr-auto my-auto ml-3 md:text-6xl" />} text="User stats" paragraph="These are some stats about the user ..."/>
      <BarChart
        className=" bg-gray-50 rounded-xl py-4 px-8 border-2 border-gray-400"
        width={500}
        height={400}
        data={data}
      >
        <YAxis />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip content={<CustomeToolTip />} />
        <Legend />
        <Bar stackId={1} type="monotone" fill="#3b82f6" dataKey="value" />
      </BarChart>
  </ResponsiveContainer>
  );
};
const CustomeToolTip = ({ active, payload, label }: { active?: any; payload?: any; label?: any }) => {
  if (active && payload.length && label) {
    return (
      <div className=" p-4 bg-slate-100/40 flex flex-col gap-4 rounded-md">
        <p className=" text-gray-800 text-lg">{label}</p>
        <p className="flex items-center gap-1">
          {payload[0].name}: <div>{payload[0].value}</div>
        </p>
      </div>
    );
  }
};
export default UserData;
