---
id: "unitree-go2-voice-control"
slug: "unitree-go2-voice-control"
title: "Unitree Go2 Voice Control System"
category: "Thesis Project / Robotics"
status: "Prototype"
year: 2026
role: "Main Developer"
featured: true
visibility: "public"
order: 1
summary: "A voice and text command prototype for a Unitree Go2 robot, designed around speech recognition, semantic parsing, command planning, safety checks, queueing, mock execution, and robot adapter layers."
responsibilities:
  - "Designed the command flow from user input to validated robot action."
  - "Built the safety and command queue concepts for safer execution."
  - "Separated mock execution from the future robot adapter."
technologies:
  - "Python"
  - "Whisper"
  - "Command Planning"
  - "Safety Controller"
  - "Mock Adapter"
  - "Robot Adapter"
features:
  - "Speech and text command input"
  - "Semantic intent parsing"
  - "Safety validation before command execution"
  - "Mock execution path for local testing"
  - "Adapter layer for future hardware integration"
outcomes:
  - "Created a testable control prototype before live robot deployment."
  - "Clarified system boundaries between UI, planning, safety, and execution."
links:
  - label: "Demo Placeholder"
    url: "#"
image: "/images/projects/unitree-go2.svg"
imageAlt: "Abstract quadruped robot command interface visual"
downloads:
  - "unitree-demo-v1"
---

This project explores a safer control workflow for a robot dog command system. The first version focuses on the software architecture: accept speech or text input, convert it into a structured command, validate the action, then pass it through a queue to either a mock adapter or a future hardware adapter.

The main design goal is to keep the robot execution layer isolated from planning and safety logic. This makes it easier to test commands locally before connecting real hardware.
