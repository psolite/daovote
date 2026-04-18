export type DaoVoting = {
  "address": "7ocog5ARqzjiUVRaxfX2qbcMcyvDCEiWeCF2zwyp5DSD",
  "metadata": {
    "name": "dao_voting",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "create_proposal",
      "discriminator": [
        132,
        116,
        68,
        174,
        216,
        160,
        198,
        22
      ],
      "accounts": [
        {
          "name": "proposal",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  112,
                  111,
                  115,
                  97,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "arg",
                "path": "proposal_id"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "treasury",
          "docs": [
            "CHECK"
          ],
          "writable": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "options",
          "type": {
            "vec": "string"
          }
        },
        {
          "name": "token",
          "type": {
            "vec": "string"
          }
        },
        {
          "name": "duration",
          "type": "i64"
        },
        {
          "name": "token_amount",
          "type": {
            "vec": "u64"
          }
        },
        {
          "name": "proposal_id",
          "type": "u64"
        }
      ]
    },
    {
      "name": "vote",
      "discriminator": [
        227,
        110,
        155,
        23,
        136,
        126,
        172,
        25
      ],
      "accounts": [
        {
          "name": "proposal",
          "writable": true
        },
        {
          "name": "voter",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  111,
                  116,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "proposal"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "option_index",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "Proposal",
      "discriminator": [
        26,
        94,
        189,
        187,
        116,
        136,
        53,
        33
      ]
    },
    {
      "name": "Voter",
      "discriminator": [
        241,
        93,
        35,
        191,
        254,
        147,
        17,
        202
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "VotingPeriodEnded",
      "msg": "The voting period for this proposal has ended."
    }
  ],
  "types": [
    {
      "name": "Proposal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "token",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "options",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "vote_counts",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "created_at",
            "type": "i64"
          },
          {
            "name": "duration",
            "type": "i64"
          },
          {
            "name": "token_amount",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "Voter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proposal",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "option_voted",
            "type": "u8"
          }
        ]
      }
    }
  ]
}

export const IDL: DaoVoting = {
  "address": "7ocog5ARqzjiUVRaxfX2qbcMcyvDCEiWeCF2zwyp5DSD",
  "metadata": {
    "name": "dao_voting",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "create_proposal",
      "discriminator": [
        132,
        116,
        68,
        174,
        216,
        160,
        198,
        22
      ],
      "accounts": [
        {
          "name": "proposal",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  112,
                  111,
                  115,
                  97,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "arg",
                "path": "proposal_id"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "treasury",
          "docs": [
            "CHECK"
          ],
          "writable": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "options",
          "type": {
            "vec": "string"
          }
        },
        {
          "name": "token",
          "type": {
            "vec": "string"
          }
        },
        {
          "name": "duration",
          "type": "i64"
        },
        {
          "name": "token_amount",
          "type": {
            "vec": "u64"
          }
        },
        {
          "name": "proposal_id",
          "type": "u64"
        }
      ]
    },
    {
      "name": "vote",
      "discriminator": [
        227,
        110,
        155,
        23,
        136,
        126,
        172,
        25
      ],
      "accounts": [
        {
          "name": "proposal",
          "writable": true
        },
        {
          "name": "voter",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  111,
                  116,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "proposal"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "option_index",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "Proposal",
      "discriminator": [
        26,
        94,
        189,
        187,
        116,
        136,
        53,
        33
      ]
    },
    {
      "name": "Voter",
      "discriminator": [
        241,
        93,
        35,
        191,
        254,
        147,
        17,
        202
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "VotingPeriodEnded",
      "msg": "The voting period for this proposal has ended."
    }
  ],
  "types": [
    {
      "name": "Proposal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "token",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "options",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "vote_counts",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "created_at",
            "type": "i64"
          },
          {
            "name": "duration",
            "type": "i64"
          },
          {
            "name": "token_amount",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "Voter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proposal",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "option_voted",
            "type": "u8"
          }
        ]
      }
    }
  ]
}