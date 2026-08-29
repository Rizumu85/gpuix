import React from "react"
import {
  createRenderer,
  createRoot,
  flushSync,
} from "@gpuix/react"

const main = createRenderer()
main.init({
  title: "GPUIX anchored popup probe",
  width: 520,
  height: 320,
  focus: false,
})

const mainRoot = createRoot(main)
flushSync(() => {
  mainRoot.render(
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f4f4f6",
        padding: 40,
      }}
    >
      <text style={{ fontSize: 18, color: "#242428" }}>
        Native popup owner
      </text>
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 150,
          width: 300,
          height: 40,
          borderRadius: 10,
          backgroundColor: "#ffffff",
          borderWidth: 1,
          borderColor: "#d8d8dc",
          paddingLeft: 14,
          justifyContent: "center",
        }}
      >
        <text style={{ color: "#35353a" }}>P1 · Anchored trigger</text>
      </div>
    </div>
  )
})

const popup = createRenderer()
popup.init({
  title: "GPUIX anchored popup",
  width: 320,
  height: 226,
  focus: false,
  transparent: true,
  windowBackground: "transparent",
  resizable: false,
  anchoredPopup: {
    parentWindowId: main.getWindowId(),
    anchorX: 40,
    anchorY: 150,
    anchorWidth: 300,
    anchorHeight: 40,
    anchor: "bottomLeft",
    gravity: "bottomRight",
    offsetY: 6,
    constraintAdjustment: ["flipY", "slideX", "slideY"],
    grab: false,
  },
})

const popupRoot = createRoot(popup)
flushSync(() => {
  popupRoot.render(
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#e1e1e5",
        padding: 10,
        gap: 3,
      }}
    >
      {["P1 · First item", "P2 · Second item", "P3 · Third item", "P4 · Fourth item"].map(
        (label, index) => (
          <div
            key={label}
            style={{
              height: 45,
              borderRadius: 9,
              backgroundColor: index === 0 ? "#f1f1f3" : "transparent",
              paddingLeft: 12,
              justifyContent: "center",
            }}
          >
            <text style={{ color: "#303035" }}>{label}</text>
          </div>
        )
      )}
    </div>
  )
})

if (process.env.GPUIX_PROBE_AUTOCLOSE === "1") {
  setTimeout(() => popup.closeWindow(), 250)
  setTimeout(() => main.closeWindow(), 1_500)
}
