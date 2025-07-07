"use client";
import React, { useState } from "react";
import Footer from "@/app/footer/page";
import Head from "next/head";
// pages/_app.js or _app.tsx
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Info } from 'lucide-react';
config.autoAddCss = false


type Shape = "rectangle" | "circle";
type Purpose = "coating" | "casting";
type Ratio = "2:1" | "3:1";

export default function Home() {
  const [step, setStep ] = useState(1);
  const [showTips,setShowTips] = useState(false)
  const [showCalculationInfo, setShowCalculationInfo] = useState(false);
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
    const density = 1; // g/cm³
    let areaCm2 = 0;
    let t = parseFloat(thickness);
    if (!t || isNaN(t)) t = 1.3; // default 1mm for coating
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

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <link rel="canonical" href="https://proskill.in/calculator" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 w-full relative">
        {/* Background Layer */}
        <div className="absolute inset-0 w-full h-full z-0 bg-white">
          <div
            style={{
              width: '100%',
              height: '100%',
              opacity: 0.4,
              backgroundImage: "url('/doodle.png')",
              backgroundRepeat: 'repeat',
              backgroundSize: '250px 250px',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 0,
            }}
          />
        </div>

        {/* Menu Bar */}
        <nav className="fixed top-0 left-0 w-full z-20 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-black bg-opacity-80">
          <span className="text-white text-2xl font-bold tracking-wide"><img src="/PROSKILL.png" style={{width:"68px" , height:"40px"}} alt="" /></span>
          <button
            className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <span className="block w-7 h-1 bg-white mb-1 rounded transition-all" style={{transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none'}}></span>
            <span className={`block w-7 h-1 bg-white mb-1 rounded transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className="block w-7 h-1 bg-white rounded transition-all" style={{transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'}}></span>
          </button>
          {menuOpen && (
            <div className="absolute right-6 top-16 bg-black bg-opacity-95 rounded-xl shadow-lg py-4 px-8 flex flex-col gap-4 min-w-[180px] animate-fade-in z-30">
              <a
                href="/testimonial"
                className="text-white text-lg font-semibold hover:text-gray-300 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Testimonials
              </a>
            </div>
          )}
        </nav>

        <div className="bg-black bg-opacity-90 rounded-3xl shadow-2xl p-4 sm:p-8 md:p-10 w-full max-w-full sm:max-w-2xl md:max-w-3xl flex flex-col items-start relative z-10 mt-20">
          <div className="flex items-center justify-between w-full mb-6">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              Resin mixing calculator
            </h1>
            <button
              className="ml-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
              onClick={() => setShowCalculationInfo(!showCalculationInfo)}
              aria-label="Show calculation information"
            >
              <Info className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Calculation Information Panel */}
          {showCalculationInfo && (
            <div className="w-full bg-white bg-opacity-10 rounded-2xl p-6 mb-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">How We Calculate Your Resin Requirements</h3>
              <div className="space-y-4 text-white">
                <div>
                  <h4 className="font-semibold text-lg mb-2">📐 Area Calculation</h4>
                  <p className="text-sm leading-relaxed">
                    • <strong>Rectangle:</strong> Length × Breadth (converted from inches to cm)<br/>
                    • <strong>Circle:</strong> π × (Diameter/2)² (using 3.14159 for precision)
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-2">🧪 Resin Formula</h4>
                  <p className="text-sm leading-relaxed">
                    Our calculation uses the industry-standard formula:<br/>
                    <strong>Resin (grams) = Area (cm²) × Thickness (mm) × Density (g/cm³) ÷ 10</strong>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">⚖️ Mixing Ratios</h4>
                  <p className="text-sm leading-relaxed">
                    • <strong>2:1 Ratio:</strong> 2 parts resin + 1 part hardener<br/>
                    • <strong>3:1 Ratio:</strong> 3 parts resin + 1 part hardener<br/>
                    <em>Always measure by weight for best results!</em>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">📏 Default Values</h4>
                  <p className="text-sm leading-relaxed">
                    • <strong>Coating thickness:</strong> 1.3mm (typical for protective coatings)<br/>
                    • <strong>Density:</strong> 1 g/cm³ (standard for most epoxy resins)<br/>
                    • <strong>Cost estimate:</strong> ₹870/kg (includes resin + hardener)
                  </p>
                </div>

                <div className="bg-yellow-500 bg-opacity-20 rounded-lg p-3 mt-4">
                  <p className="text-sm font-medium">
                    💡 <strong>Pro Tip:</strong> Always prepare 10-15% extra resin to account for mixing losses and ensure complete coverage!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Shape */}
          <div className="w-full">
            <p className="mb-4 text-lg font-medium text-white text-left">Please select an option:</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
                What are you planning to do with Proskill Resin and Hardener?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
                      placeholder="e.g., 12"
                    />
                  </label>
                  <label className="text-white">
                    Breadth (in inches)
                    <input
                      type="number"
                      className="input"
                      value={breadth}
                      onChange={(e) => setBreadth(e.target.value)}
                      placeholder="e.g., 8"
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
                        placeholder="e.g., 5"
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
                      placeholder="e.g., 10"
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
                        placeholder="e.g., 5"
                      />
                    </label>
                  )}
                </div>
              </>
            )}
            <button
              className="btn mt-6 w-full sm:w-auto"
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
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white">
              Total {resinGm.toFixed(2)} Grams or {resinKg.toFixed(2)} Kg
            </h2>
            <div className="text-lg sm:text-xl font-semibold mb-2 text-white">
              Resin: {resinPart.toFixed(2)}Gm &nbsp; Hardener: {hardenerPart.toFixed(2)}Gm
            </div>
            <div className="text-base sm:text-lg font-medium mb-2 text-white">
              Estimated cost: ₹{cost.toFixed(2)} (approx).
            </div>
            <div className="text-gray-300 mb-4">
              (Ratio selected: {ratio})
            </div>
            
            {/* Additional calculation details */}
            <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-black mb-2">📊 Calculation Details:</h4>
              <div className="text-sm text-black space-y-1">
                <p className="text-black">• Surface area: {shape === "rectangle" ? 
                  `${(parseFloat(length) * 2.54).toFixed(1)} × ${(parseFloat(breadth) * 2.54).toFixed(1)} = ${((parseFloat(length) * 2.54) * (parseFloat(breadth) * 2.54)).toFixed(1)} cm²` :
                  `π × (${(parseFloat(diameter) * 2.54 / 2).toFixed(1)})² = ${(Math.PI * Math.pow(parseFloat(diameter) * 2.54 / 2, 2)).toFixed(1)} cm²`
                }</p>
                <p>• Thickness: {parseFloat(thickness) || 1.3} mm</p>
                <p>• Density: 1 g/cm³</p>
                <p>• Formula: Area × Thickness × Density ÷ 10</p>
              </div>
            </div>
            
            <button className="btn w-full sm:w-auto" onClick={() => window.location.reload()}>
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
        .btn:disabled {
          background: #ccc;
          color: #888;
          cursor: not-allowed;
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
        .input::placeholder {
          color: #999;
        }
        label {
          color: #fff;
        }
         .text-lg, .font-medium {
          color: #fff;
        }
      `}</style>
     
      </div>
      <Footer />
    </>
  );
}