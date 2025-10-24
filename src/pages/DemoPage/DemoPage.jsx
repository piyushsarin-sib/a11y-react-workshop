import React from "react";
import { Link } from "react-router-dom";

export default function DemoPage() {
  const demoLinks = [
    {
      to: "/demos/overlay/dialog",
      title: "Dialog Example",
      desc: "Accessible dialog overlay demo",
    },
    {
      to: "/demos/overlay/popover",
      title: "Simple Popover",
      desc: "Accessible popover component demo",
    },
  ];

  return (
    <div
      className="bg-gray-50 flex flex-col items-center justify-center p-6"
      style={{ width: "100%", minHeight: "60vh" }}
    >
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900" id="page-heading">
          Interactive Accessibility Demos
        </h1>
        <p className="text-lg text-gray-700 mt-4 text-center max-w-3xl">
          Explore interactive examples demonstrating accessibility patterns and best practices
        </p>
      </header>
      <nav aria-labelledby="page-heading" style={{ width: "100%" }}>
        <ul className="grid grid-cols-1 md:grid-cols-1 gap-8 list-none p-0 w-full">
          {demoLinks.map((demo) => (
            <li key={demo.to} className="w-full">
              <Link
                to={demo.to}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:border-blue-500 border-2 border-transparent transition-all block w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-describedby={`desc-${demo.to.replaceAll("/", "-")}`}
              >
                <h2 className="text-2xl font-semibold text-gray-900">{demo.title}</h2>
                <p className="mt-2 text-gray-700" id={`desc-${demo.to.replaceAll("/", "-")}`}>
                  {demo.desc}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
