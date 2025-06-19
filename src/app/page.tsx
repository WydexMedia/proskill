"use client";
import React, { useState } from "react";

type Shape = "rectangle" | "circle";
type Purpose = "coating" | "casting";
type Ratio = "2:1" | "3:1";

export default function Home() {
  const [step, setStep] = useState(1);
  const [shape, setShape] = useState<Shape | null>(null);
  const [purpose, setPurpose] = useState<Purpose | null>(null);
  const [ratio, setRatio] = useState<Ratio | null>(null);
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [diameter, setDiameter] = useState("");
  const [thickness, setThickness] = useState("");

  let resinRequired = 0;
  let resinGm = 0;
  let resinKg = 0;
  let resinPart = 0;
  let hardenerPart = 0;
  let cost = 0;
  if (step === 5) {
    // Conversion factors
    const inchToCm = 2.54;
    const density = 1.1; // g/cm³
    let areaCm2 = 0;
    let t = parseFloat(thickness);
    if (!t || isNaN(t)) t = 1; // default 1mm for coating
    if (shape === "rectangle") {
      const l = parseFloat(length) * inchToCm;
      const b = parseFloat(breadth) * inchToCm;
      areaCm2 = l * b;
    } else if (shape === "circle") {
      const d = parseFloat(diameter) * inchToCm;
      areaCm2 = Math.PI * Math.pow(d / 2, 2);
    }
    // Industry-standard: grams = area (cm²) × thickness (mm) × density (g/cm³) ÷ 10
    resinGm = areaCm2 * t * density / 10;
    resinKg = resinGm / 1000;
    // Ratio split
    if (ratio === "2:1") {
      resinPart = resinGm * 2 / 3;
      hardenerPart = resinGm / 3;
    } else if (ratio === "3:1") {
      resinPart = resinGm * 3 / 4;
      hardenerPart = resinGm / 4;
    }
    // Cost estimate (assume ₹870/kg for resin+hardener)
    cost = resinKg * 870;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 w-full">
      <div className="bg-black rounded-3xl shadow-2xl p-10 w-full flex flex-col items-start">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 drop-shadow-lg text-left w-full">
          Proskill Resin Calculator
        </h1>

        {/* Step 1: Shape */}
        <div className="w-full">
          <p className="mb-4 text-lg font-medium text-white text-left">Please select an option:</p>
          <div className="flex gap-4 mb-6">
            <button
              className={`btn${shape === "rectangle" ? " ring-2 ring-white" : ""}`}
              onClick={() => setShape("rectangle")}
            >
              Rectangle/Square
            </button>
            <button
              className={`btn${shape === "circle" ? " ring-2 ring-white" : ""}`}
              onClick={() => setShape("circle")}
            >
              Circle
            </button>
          </div>
        </div>

        {/* Step 2: Purpose */}
        {shape && (
          <div className="w-full">
            <p className="mb-4 text-lg font-medium text-white text-left">
              What are you planning to do with Tulsi Resin and Hardener?
            </p>
            <div className="flex gap-4 mb-6">
              <button
                className={`btn${purpose === "coating" ? " ring-2 ring-white" : ""}`}
                onClick={() => setPurpose("coating")}
              >
                Coating
              </button>
              <button
                className={`btn${purpose === "casting" ? " ring-2 ring-white" : ""}`}
                onClick={() => setPurpose("casting")}
              >
                Casting
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Ratio */}
        {purpose && (
          <div className="w-full">
            <p className="mb-4 text-lg font-medium text-white text-left">
              Which type of Epoxy resin hardener are you using?
            </p>
            <div className="flex gap-4 mb-6">
              <button
                className={`btn${ratio === "2:1" ? " ring-2 ring-white" : ""}`}
                onClick={() => setRatio("2:1")}
              >
                2:1
              </button>
              <button
                className={`btn${ratio === "3:1" ? " ring-2 ring-white" : ""}`}
                onClick={() => setRatio("3:1")}
              >
                3:1
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Dimensions */}
        {ratio && (
          <div className="w-full">
            {shape === "rectangle" && (
              <>
                <p className="mb-4 text-lg font-medium text-white text-left">
                  Rectangle {purpose === "coating" ? "Coating" : "Casting"}
                </p>
                <div className="flex flex-col gap-3 w-full">
                  <label className="text-white">
                    Length (in inches)
                    <input
                      type="number"
                      className="input"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    />
                  </label>
                  <label className="text-white">
                    Breadth (in inches)
                    <input
                      type="number"
                      className="input"
                      value={breadth}
                      onChange={(e) => setBreadth(e.target.value)}
                    />
                  </label>
                  {purpose === "casting" && (
                    <label className="text-white">
                      Thickness (in mm)
                      <input
                        type="number"
                        className="input"
                        value={thickness}
                        onChange={(e) => setThickness(e.target.value)}
                      />
                    </label>
                  )}
                </div>
              </>
            )}
            {shape === "circle" && (
              <>
                <p className="mb-4 text-lg font-medium text-white text-left">
                  Circle {purpose === "coating" ? "Coating" : "Casting"}
                </p>
                <div className="flex flex-col gap-3 w-full">
                  <label className="text-white">
                    Diameter (in inches)
                    <input
                      type="number"
                      className="input"
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                    />
                  </label>
                  {purpose === "casting" && (
                    <label className="text-white">
                      Thickness (in mm)
                      <input
                        type="number"
                        className="input"
                        value={thickness}
                        onChange={(e) => setThickness(e.target.value)}
                      />
                    </label>
                  )}
                </div>
              </>
            )}
            <button
              className="btn mt-6"
              onClick={() => setStep(5)}
              disabled={
                (shape === "rectangle" &&
                  (!length || !breadth || (purpose === "casting" && !thickness))) ||
                (shape === "circle" &&
                  (!diameter || (purpose === "casting" && !thickness)))
              }
            >
              Calculate
            </button>
          </div>
        )}

        {/* Step 5: Result */}
        {step === 5 && (
          <div className="text-left w-full">
            <div className="text-lg font-bold mb-2 text-white">
              Total Proskill resin required:
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Total {resinGm.toFixed(2)} Grams or {resinKg.toFixed(2)} Kg
            </h2>
            <div className="text-xl font-semibold mb-2 text-white">
              Resin: {resinPart.toFixed(2)}Gm &nbsp; Hardener: {hardenerPart.toFixed(2)}Gm
            </div>
            <div className="text-lg font-medium mb-2 text-white">
              Estimated cost: ₹{cost.toFixed(2)} (approx).
            </div>
            <div className="text-gray-300 mb-4">
              (Ratio selected: {ratio})
            </div>
            <button className="btn" onClick={() => window.location.reload()}>
              Start Over
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        .btn {
          background: #fff;
          color: #000;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          border: 2px solid #000;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .btn:hover {
          background: #888;
          color: #fff;
        }
        .input {
          width: 100%;
          padding: 0.5rem;
          border-radius: 0.5rem;
          border: 1.5px solid #000;
          margin-top: 0.25rem;
          background: #fff;
          color: #000;
        }
        label {
          color: #fff;
        }
        p, .text-lg, .font-medium {
          color: #fff;
        }
      `}</style>
      <footer className="mt-10 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Proskill. All rights reserved.
      </footer>
    </div>
  );
}