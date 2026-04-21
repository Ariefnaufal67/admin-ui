import React from "react";
import UserCard from "./UserCard";

function Exercise() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          User Cards
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <UserCard 
          name="Arief"
          email="arief@example.com"
          street="Jl.Indraprasta No.10"
          city="Ungaran"/>
          <UserCard 
          name="Naufal"
          email="naufal@example.com"
          street="Jl.Imam Bonjol No.123"
          city="Semarang"/>
          <UserCard 
          name="Al-Azmi"
          email="al-azmi@example.com"
          street="Jl.JatiMakmur No.456"
          city="Bekasi"/>
        </div>
      </div>
    </>
  );
}

export default Exercise;