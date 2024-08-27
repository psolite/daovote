export type DaoVoting = {
  "version": "0.1.0",
  "name": "dao_voting",
  "instructions": [
    {
      "name": "createProposal",
      "accounts": [
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
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
          "name": "proposalId",
          "type": "u64"
        },
        {
          "name": "duration",
          "type": "i64"
        },
        {
          "name": "point",
          "type": "u32"
        }
      ]
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "optionIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "getProposalPda",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [],
      "returns": {
        "defined": "GetProposalPDAResponse"
      }
    }
  ],
  "accounts": [
    {
      "name": "proposal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proposalId",
            "type": "u64"
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
            "name": "voteCounts",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "duration",
            "type": "i64"
          },
          {
            "name": "point",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "voter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proposal",
            "type": "publicKey"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "optionVoted",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "GetProposalPDAResponse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proposalPda",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "proposalId",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "VoteOnOption",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "optionIndex",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "VotingPeriodEnded",
      "msg": "The voting period for this proposal has ended."
    }
  ]
};

export const IDL: DaoVoting = {
  "version": "0.1.0",
  "name": "dao_voting",
  "instructions": [
    {
      "name": "createProposal",
      "accounts": [
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
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
          "name": "proposalId",
          "type": "u64"
        },
        {
          "name": "duration",
          "type": "i64"
        },
        {
          "name": "point",
          "type": "u32"
        }
      ]
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "optionIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "getProposalPda",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [],
      "returns": {
        "defined": "GetProposalPDAResponse"
      }
    }
  ],
  "accounts": [
    {
      "name": "proposal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proposalId",
            "type": "u64"
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
            "name": "voteCounts",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "duration",
            "type": "i64"
          },
          {
            "name": "point",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "voter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proposal",
            "type": "publicKey"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "optionVoted",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "GetProposalPDAResponse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proposalPda",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "proposalId",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "VoteOnOption",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "optionIndex",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "VotingPeriodEnded",
      "msg": "The voting period for this proposal has ended."
    }
  ]
};
