'use strict';
module.exports={
  "stable-order": {
    "fn": "orderActions",
    "tests": [
      {
        "args": [
          [
            {
              "id": "held-z",
              "priority": 3
            },
            {
              "id": "held-A",
              "priority": 3
            },
            {
              "id": "held-d",
              "priority": -0.75
            },
            {
              "id": "held-M",
              "priority": 0
            },
            {
              "id": "held-c",
              "priority": []
            },
            {
              "id": "held-B",
              "priority": {}
            },
            {
              "id": "held-q"
            }
          ]
        ],
        "expected": [
          {
            "id": "held-d",
            "priority": -0.75
          },
          {
            "id": "held-M",
            "priority": 0
          },
          {
            "id": "held-A",
            "priority": 3
          },
          {
            "id": "held-z",
            "priority": 3
          },
          {
            "id": "held-B",
            "priority": {}
          },
          {
            "id": "held-c",
            "priority": []
          },
          {
            "id": "held-q"
          }
        ],
        "property": "contract"
      },
      {
        "args": [
          [
            {
              "id": "hidden-Ω",
              "priority": "-9"
            },
            {
              "id": "hidden-z",
              "priority": null
            },
            {
              "id": "hidden-A",
              "priority": true
            }
          ]
        ],
        "expected": [
          {
            "id": "hidden-A",
            "priority": true
          },
          {
            "id": "hidden-z",
            "priority": null
          },
          {
            "id": "hidden-Ω",
            "priority": "-9"
          }
        ],
        "property": "contract"
      },
      {
        "args": [
          [
            {
              "id": "tie",
              "priority": -9,
              "title": "one"
            },
            {
              "id": "tie",
              "priority": -9,
              "title": "two"
            },
            {
              "id": "tie",
              "priority": -9,
              "title": "three"
            }
          ]
        ],
        "expected": [
          {
            "id": "tie",
            "priority": -9,
            "title": "one"
          },
          {
            "id": "tie",
            "priority": -9,
            "title": "two"
          },
          {
            "id": "tie",
            "priority": -9,
            "title": "three"
          }
        ],
        "property": "contract"
      },
      {
        "argsExpression": "[[{id:\"x\",priority:NaN},{id:\"b\",priority:-Infinity},{id:\"r\",priority:Infinity},{id:\"c\",priority:-0}]]",
        "expected": [
          {
            "id": "c",
            "priority": 0
          },
          {
            "id": "b",
            "priority": {
              "$number": "-Infinity"
            }
          },
          {
            "id": "r",
            "priority": {
              "$number": "Infinity"
            }
          },
          {
            "id": "x",
            "priority": {
              "$number": "NaN"
            }
          }
        ],
        "property": "contract"
      },
      {
        "args": [
          [
            {
              "id": "雪",
              "priority": 11
            },
            {
              "id": "b",
              "priority": 11
            },
            {
              "id": "Z",
              "priority": 11
            }
          ]
        ],
        "expected": [
          {
            "id": "Z",
            "priority": 11
          },
          {
            "id": "b",
            "priority": 11
          },
          {
            "id": "雪",
            "priority": 11
          }
        ],
        "property": "contract"
      },
      {
        "args": [
          []
        ],
        "expected": [],
        "property": "contract"
      }
    ]
  },
  "device-labels": {
    "fn": "deviceLabels",
    "tests": [
      {
        "args": [
          [
            "phone",
            "phone",
            "computer",
            "computer"
          ]
        ],
        "expected": [
          "Computer possible",
          "Phone possible"
        ],
        "property": "contract"
      },
      {
        "args": [
          [
            "tablet",
            "computer",
            "phone",
            "tablet"
          ]
        ],
        "expected": [
          "Computer possible",
          "Phone possible"
        ],
        "property": "contract"
      },
      {
        "args": [
          [
            "tablet",
            "phone",
            "phone"
          ]
        ],
        "expected": [
          "Phone possible"
        ],
        "property": "contract"
      },
      {
        "args": [
          [
            "unknown",
            "computer",
            "computer",
            "Phone"
          ]
        ],
        "expected": [
          "Computer required"
        ],
        "property": "contract"
      },
      {
        "args": [
          [
            "PHONE",
            "COMPUTER"
          ]
        ],
        "expected": [],
        "property": "contract"
      },
      {
        "args": [
          false
        ],
        "expected": [],
        "property": "contract"
      },
      {
        "args": [
          42
        ],
        "expected": [],
        "property": "contract"
      },
      {
        "args": [
          []
        ],
        "expected": [],
        "property": "contract"
      },
      {
        "args": [
          {
            "phone": true
          }
        ],
        "expected": [],
        "property": "contract"
      },
      {
        "argsExpression": "[undefined]",
        "expected": [],
        "property": "contract"
      }
    ]
  }
};
