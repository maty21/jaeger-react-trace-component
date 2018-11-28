export default  {
    services: [
        {
            name: 'api-server',
            numberOfSpans: 1
        },
        {
            name: 'pipeline-driver-queue',
            numberOfSpans: 2
        },
        {
            name: 'pipeline-driver',
            numberOfSpans: 3
        },
        {
            name: 'algorithm-queue',
            numberOfSpans: 2
        },
        {
            name: 'worker',
            numberOfSpans: 6
        }
    ],
    spans: [
        {
            traceID: '40a4a70fb2102eea',
            spanID: '40a4a70fb2102eea',
            flags: 1,
            operationName: 'run pipeline',
            references: [],
            startTime: 1543140789400000,
            duration: 121000,
            tags: [
                {
                    key: 'sampler.type',
                    type: 'string',
                    value: 'const'
                },
                {
                    key: 'sampler.param',
                    type: 'bool',
                    value: true
                },
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                },
                {
                    key: 'name',
                    type: 'string',
                    value: 'bool'
                }
            ],
            logs: [],
            processID: 'p5',
            warnings: null,
            process: {
                serviceName: 'api-server',
                tags: [
                    {
                        key: 'client-uuid',
                        type: 'string',
                        value: '6fd5988e-68cc-445a-836c-e23acbbda0f9'
                    },
                    {
                        key: 'ip',
                        type: 'float64',
                        value: 183058482
                    },
                    {
                        key: 'jaeger.hostname',
                        type: 'string',
                        value: 'api-server-6b4889b85f-hsz6q'
                    },
                    {
                        key: 'jaeger.version',
                        type: 'string',
                        value: 'Node-3.13.0'
                    }
                ]
            },
            relativeStartTime: 0,
            depth: 0,
            hasChildren: false
        },
        {
            traceID: '40a4a70fb2102eea',
            spanID: 'd410cd25c239074',
            flags: 1,
            operationName: 'pipeline-job start',
            references: [
                {
                    refType: 'CHILD_OF',
                    traceID: '40a4a70fb2102eea',
                    spanID: 'f3750cf9e8ad044f'
                }
            ],
            startTime: 1543140789522000,
            duration: 16000,
            tags: [
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                }
            ],
            logs: [],
            processID: 'p2',
            warnings: [
                'invalid parent span IDs=f3750cf9e8ad044f; skipping clock skew adjustment'
            ],
            process: {
                serviceName: 'pipeline-driver-queue',
                tags: [
                    {
                        key: 'client-uuid',
                        type: 'string',
                        value: '15ba3b4a-e4bb-4df0-979f-f95d43e29341'
                    },
                    {
                        key: 'ip',
                        type: 'float64',
                        value: 183058578
                    },
                    {
                        key: 'jaeger.hostname',
                        type: 'string',
                        value: 'pipeline-driver-queue-86f5cd89b-c2s22'
                    },
                    {
                        key: 'jaeger.version',
                        type: 'string',
                        value: 'Node-3.11.0'
                    }
                ]
            },
            relativeStartTime: 122000,
            depth: 0,
            hasChildren: false
        },
        {
            traceID: '40a4a70fb2102eea',
            spanID: 'a3f741f24cdd01ce',
            flags: 1,
            operationName: 'producer',
            references: [
                {
                    refType: 'CHILD_OF',
                    traceID: '40a4a70fb2102eea',
                    spanID: 'f3750cf9e8ad044f'
                }
            ],
            startTime: 1543140789907000,
            duration: 532000,
            tags: [
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                },
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                }
            ],
            logs: [],
            processID: 'p2',
            warnings: [
                'invalid parent span IDs=f3750cf9e8ad044f; skipping clock skew adjustment'
            ],
            process: {
                serviceName: 'pipeline-driver-queue',
                tags: [
                    {
                        key: 'client-uuid',
                        type: 'string',
                        value: '15ba3b4a-e4bb-4df0-979f-f95d43e29341'
                    },
                    {
                        key: 'ip',
                        type: 'float64',
                        value: 183058578
                    },
                    {
                        key: 'jaeger.hostname',
                        type: 'string',
                        value: 'pipeline-driver-queue-86f5cd89b-c2s22'
                    },
                    {
                        key: 'jaeger.version',
                        type: 'string',
                        value: 'Node-3.11.0'
                    }
                ]
            },
            relativeStartTime: 507000,
            depth: 0,
            hasChildren: true
        },
        {
            traceID: '40a4a70fb2102eea',
            spanID: 'c8a2e4f9dda71e0c',
            flags: 1,
            operationName: 'pipeline-job start',
            references: [
                {
                    refType: 'CHILD_OF',
                    traceID: '40a4a70fb2102eea',
                    spanID: 'a3f741f24cdd01ce',
                    span: {
                        traceID: '40a4a70fb2102eea',
                        spanID: 'a3f741f24cdd01ce',
                        flags: 1,
                        operationName: 'producer',
                        references: [
                            {
                                refType: 'CHILD_OF',
                                traceID: '40a4a70fb2102eea',
                                spanID: 'f3750cf9e8ad044f'
                            }
                        ],
                        startTime: 1543140789907000,
                        duration: 532000,
                        tags: [
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                            },
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                            }
                        ],
                        logs: [],
                        processID: 'p2',
                        warnings: [
                            'invalid parent span IDs=f3750cf9e8ad044f; skipping clock skew adjustment'
                        ],
                        process: {
                            serviceName: 'pipeline-driver-queue',
                            tags: [
                                {
                                    key: 'client-uuid',
                                    type: 'string',
                                    value: '15ba3b4a-e4bb-4df0-979f-f95d43e29341'
                                },
                                {
                                    key: 'ip',
                                    type: 'float64',
                                    value: 183058578
                                },
                                {
                                    key: 'jaeger.hostname',
                                    type: 'string',
                                    value: 'pipeline-driver-queue-86f5cd89b-c2s22'
                                },
                                {
                                    key: 'jaeger.version',
                                    type: 'string',
                                    value: 'Node-3.11.0'
                                }
                            ]
                        },
                        relativeStartTime: 507000,
                        depth: 0,
                        hasChildren: true
                    }
                }
            ],
            startTime: 1543140789911000,
            duration: 524000,
            tags: [
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                }
            ],
            logs: [],
            processID: 'p3',
            warnings: null,
            process: {
                serviceName: 'pipeline-driver',
                tags: [
                    {
                        key: 'client-uuid',
                        type: 'string',
                        value: '33d1b87a-5362-412a-ada1-24d75858f666'
                    },
                    {
                        key: 'ip',
                        type: 'float64',
                        value: 183059116
                    },
                    {
                        key: 'jaeger.hostname',
                        type: 'string',
                        value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                    },
                    {
                        key: 'jaeger.version',
                        type: 'string',
                        value: 'Node-3.13.0'
                    }
                ]
            },
            relativeStartTime: 511000,
            depth: 1,
            hasChildren: false
        },
        {
            traceID: '40a4a70fb2102eea',
            spanID: '64f980dff82a0b04',
            flags: 1,
            operationName: 'startPipeline',
            references: [
                {
                    refType: 'CHILD_OF',
                    traceID: '40a4a70fb2102eea',
                    spanID: 'a3f741f24cdd01ce',
                    span: {
                        traceID: '40a4a70fb2102eea',
                        spanID: 'a3f741f24cdd01ce',
                        flags: 1,
                        operationName: 'producer',
                        references: [
                            {
                                refType: 'CHILD_OF',
                                traceID: '40a4a70fb2102eea',
                                spanID: 'f3750cf9e8ad044f'
                            }
                        ],
                        startTime: 1543140789907000,
                        duration: 532000,
                        tags: [
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                            },
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                            }
                        ],
                        logs: [],
                        processID: 'p2',
                        warnings: [
                            'invalid parent span IDs=f3750cf9e8ad044f; skipping clock skew adjustment'
                        ],
                        process: {
                            serviceName: 'pipeline-driver-queue',
                            tags: [
                                {
                                    key: 'client-uuid',
                                    type: 'string',
                                    value: '15ba3b4a-e4bb-4df0-979f-f95d43e29341'
                                },
                                {
                                    key: 'ip',
                                    type: 'float64',
                                    value: 183058578
                                },
                                {
                                    key: 'jaeger.hostname',
                                    type: 'string',
                                    value: 'pipeline-driver-queue-86f5cd89b-c2s22'
                                },
                                {
                                    key: 'jaeger.version',
                                    type: 'string',
                                    value: 'Node-3.11.0'
                                }
                            ]
                        },
                        relativeStartTime: 507000,
                        depth: 0,
                        hasChildren: true
                    }
                }
            ],
            startTime: 1543140789960000,
            duration: 428000,
            tags: [
                {
                    key: 'status',
                    type: 'string',
                    value: 'completed'
                }
            ],
            logs: [],
            processID: 'p3',
            warnings: null,
            process: {
                serviceName: 'pipeline-driver',
                tags: [
                    {
                        key: 'client-uuid',
                        type: 'string',
                        value: '33d1b87a-5362-412a-ada1-24d75858f666'
                    },
                    {
                        key: 'ip',
                        type: 'float64',
                        value: 183059116
                    },
                    {
                        key: 'jaeger.hostname',
                        type: 'string',
                        value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                    },
                    {
                        key: 'jaeger.version',
                        type: 'string',
                        value: 'Node-3.13.0'
                    }
                ]
            },
            relativeStartTime: 560000,
            depth: 1,
            hasChildren: true
        },
        {
            traceID: '40a4a70fb2102eea',
            spanID: '1987e9ed009fc9ae',
            flags: 1,
            operationName: 'producer',
            references: [
                {
                    refType: 'CHILD_OF',
                    traceID: '40a4a70fb2102eea',
                    spanID: '64f980dff82a0b04',
                    span: {
                        traceID: '40a4a70fb2102eea',
                        spanID: '64f980dff82a0b04',
                        flags: 1,
                        operationName: 'startPipeline',
                        references: [
                            {
                                refType: 'CHILD_OF',
                                traceID: '40a4a70fb2102eea',
                                spanID: 'a3f741f24cdd01ce',
                                span: {
                                    traceID: '40a4a70fb2102eea',
                                    spanID: 'a3f741f24cdd01ce',
                                    flags: 1,
                                    operationName: 'producer',
                                    references: [
                                        {
                                            refType: 'CHILD_OF',
                                            traceID: '40a4a70fb2102eea',
                                            spanID: 'f3750cf9e8ad044f'
                                        }
                                    ],
                                    startTime: 1543140789907000,
                                    duration: 532000,
                                    tags: [
                                        {
                                            key: 'jobId',
                                            type: 'string',
                                            value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                        },
                                        {
                                            key: 'jobId',
                                            type: 'string',
                                            value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                        }
                                    ],
                                    logs: [],
                                    processID: 'p2',
                                    warnings: [
                                        'invalid parent span IDs=f3750cf9e8ad044f; skipping clock skew adjustment'
                                    ],
                                    process: {
                                        serviceName: 'pipeline-driver-queue',
                                        tags: [
                                            {
                                                key: 'client-uuid',
                                                type: 'string',
                                                value: '15ba3b4a-e4bb-4df0-979f-f95d43e29341'
                                            },
                                            {
                                                key: 'ip',
                                                type: 'float64',
                                                value: 183058578
                                            },
                                            {
                                                key: 'jaeger.hostname',
                                                type: 'string',
                                                value: 'pipeline-driver-queue-86f5cd89b-c2s22'
                                            },
                                            {
                                                key: 'jaeger.version',
                                                type: 'string',
                                                value: 'Node-3.11.0'
                                            }
                                        ]
                                    },
                                    relativeStartTime: 507000,
                                    depth: 0,
                                    hasChildren: true
                                }
                            }
                        ],
                        startTime: 1543140789960000,
                        duration: 428000,
                        tags: [
                            {
                                key: 'status',
                                type: 'string',
                                value: 'completed'
                            }
                        ],
                        logs: [],
                        processID: 'p3',
                        warnings: null,
                        process: {
                            serviceName: 'pipeline-driver',
                            tags: [
                                {
                                    key: 'client-uuid',
                                    type: 'string',
                                    value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                },
                                {
                                    key: 'ip',
                                    type: 'float64',
                                    value: 183059116
                                },
                                {
                                    key: 'jaeger.hostname',
                                    type: 'string',
                                    value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                },
                                {
                                    key: 'jaeger.version',
                                    type: 'string',
                                    value: 'Node-3.13.0'
                                }
                            ]
                        },
                        relativeStartTime: 560000,
                        depth: 1,
                        hasChildren: true
                    }
                }
            ],
            startTime: 1543140790034000,
            duration: 10000,
            tags: [
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                },
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'eval-alg:5769f719-df22-4d78-8f08-ddac998cc8c7'
                }
            ],
            logs: [],
            processID: 'p3',
            warnings: null,
            process: {
                serviceName: 'pipeline-driver',
                tags: [
                    {
                        key: 'client-uuid',
                        type: 'string',
                        value: '33d1b87a-5362-412a-ada1-24d75858f666'
                    },
                    {
                        key: 'ip',
                        type: 'float64',
                        value: 183059116
                    },
                    {
                        key: 'jaeger.hostname',
                        type: 'string',
                        value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                    },
                    {
                        key: 'jaeger.version',
                        type: 'string',
                        value: 'Node-3.13.0'
                    }
                ]
            },
            relativeStartTime: 634000,
            depth: 2,
            hasChildren: true
        },
        {
            traceID: '40a4a70fb2102eea',
            spanID: '884b80ae085d4cd9',
            flags: 1,
            operationName: 'eval-alg start',
            references: [
                {
                    refType: 'CHILD_OF',
                    traceID: '40a4a70fb2102eea',
                    spanID: '1987e9ed009fc9ae',
                    span: {
                        traceID: '40a4a70fb2102eea',
                        spanID: '1987e9ed009fc9ae',
                        flags: 1,
                        operationName: 'producer',
                        references: [
                            {
                                refType: 'CHILD_OF',
                                traceID: '40a4a70fb2102eea',
                                spanID: '64f980dff82a0b04',
                                span: {
                                    traceID: '40a4a70fb2102eea',
                                    spanID: '64f980dff82a0b04',
                                    flags: 1,
                                    operationName: 'startPipeline',
                                    references: [
                                        {
                                            refType: 'CHILD_OF',
                                            traceID: '40a4a70fb2102eea',
                                            spanID: 'a3f741f24cdd01ce',
                                            span: {
                                                traceID: '40a4a70fb2102eea',
                                                spanID: 'a3f741f24cdd01ce',
                                                flags: 1,
                                                operationName: 'producer',
                                                references: [
                                                    {
                                                        refType: 'CHILD_OF',
                                                        traceID: '40a4a70fb2102eea',
                                                        spanID: 'f3750cf9e8ad044f'
                                                    }
                                                ],
                                                startTime: 1543140789907000,
                                                duration: 532000,
                                                tags: [
                                                    {
                                                        key: 'jobId',
                                                        type: 'string',
                                                        value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                    },
                                                    {
                                                        key: 'jobId',
                                                        type: 'string',
                                                        value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                    }
                                                ],
                                                logs: [],
                                                processID: 'p2',
                                                warnings: [
                                                    'invalid parent span IDs=f3750cf9e8ad044f; skipping clock skew adjustment'
                                                ],
                                                process: {
                                                    serviceName: 'pipeline-driver-queue',
                                                    tags: [
                                                        {
                                                            key: 'client-uuid',
                                                            type: 'string',
                                                            value: '15ba3b4a-e4bb-4df0-979f-f95d43e29341'
                                                        },
                                                        {
                                                            key: 'ip',
                                                            type: 'float64',
                                                            value: 183058578
                                                        },
                                                        {
                                                            key: 'jaeger.hostname',
                                                            type: 'string',
                                                            value: 'pipeline-driver-queue-86f5cd89b-c2s22'
                                                        },
                                                        {
                                                            key: 'jaeger.version',
                                                            type: 'string',
                                                            value: 'Node-3.11.0'
                                                        }
                                                    ]
                                                },
                                                relativeStartTime: 507000,
                                                depth: 0,
                                                hasChildren: true
                                            }
                                        }
                                    ],
                                    startTime: 1543140789960000,
                                    duration: 428000,
                                    tags: [
                                        {
                                            key: 'status',
                                            type: 'string',
                                            value: 'completed'
                                        }
                                    ],
                                    logs: [],
                                    processID: 'p3',
                                    warnings: null,
                                    process: {
                                        serviceName: 'pipeline-driver',
                                        tags: [
                                            {
                                                key: 'client-uuid',
                                                type: 'string',
                                                value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                            },
                                            {
                                                key: 'ip',
                                                type: 'float64',
                                                value: 183059116
                                            },
                                            {
                                                key: 'jaeger.hostname',
                                                type: 'string',
                                                value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                            },
                                            {
                                                key: 'jaeger.version',
                                                type: 'string',
                                                value: 'Node-3.13.0'
                                            }
                                        ]
                                    },
                                    relativeStartTime: 560000,
                                    depth: 1,
                                    hasChildren: true
                                }
                            }
                        ],
                        startTime: 1543140790034000,
                        duration: 10000,
                        tags: [
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                            },
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'eval-alg:5769f719-df22-4d78-8f08-ddac998cc8c7'
                            }
                        ],
                        logs: [],
                        processID: 'p3',
                        warnings: null,
                        process: {
                            serviceName: 'pipeline-driver',
                            tags: [
                                {
                                    key: 'client-uuid',
                                    type: 'string',
                                    value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                },
                                {
                                    key: 'ip',
                                    type: 'float64',
                                    value: 183059116
                                },
                                {
                                    key: 'jaeger.hostname',
                                    type: 'string',
                                    value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                },
                                {
                                    key: 'jaeger.version',
                                    type: 'string',
                                    value: 'Node-3.13.0'
                                }
                            ]
                        },
                        relativeStartTime: 634000,
                        depth: 2,
                        hasChildren: true
                    }
                }
            ],
            startTime: 1543140790040000,
            duration: 3000,
            tags: [
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'eval-alg:5769f719-df22-4d78-8f08-ddac998cc8c7'
                }
            ],
            logs: [],
            processID: 'p1',
            warnings: null,
            process: {
                serviceName: 'algorithm-queue',
                tags: [
                    {
                        key: 'client-uuid',
                        type: 'string',
                        value: 'bd92817e-d779-404f-a680-fbe27318ccf6'
                    },
                    {
                        key: 'ip',
                        type: 'float64',
                        value: 183058594
                    },
                    {
                        key: 'jaeger.hostname',
                        type: 'string',
                        value: 'algorithm-queue-eval-alg-84dd7c685b-cwslh'
                    },
                    {
                        key: 'jaeger.version',
                        type: 'string',
                        value: 'Node-3.11.0'
                    }
                ]
            },
            relativeStartTime: 640000,
            depth: 3,
            hasChildren: false
        },
        {
            traceID: '40a4a70fb2102eea',
            spanID: '1d2ae94d4304d702',
            flags: 1,
            operationName: 'producer',
            references: [
                {
                    refType: 'CHILD_OF',
                    traceID: '40a4a70fb2102eea',
                    spanID: '1987e9ed009fc9ae',
                    span: {
                        traceID: '40a4a70fb2102eea',
                        spanID: '1987e9ed009fc9ae',
                        flags: 1,
                        operationName: 'producer',
                        references: [
                            {
                                refType: 'CHILD_OF',
                                traceID: '40a4a70fb2102eea',
                                spanID: '64f980dff82a0b04',
                                span: {
                                    traceID: '40a4a70fb2102eea',
                                    spanID: '64f980dff82a0b04',
                                    flags: 1,
                                    operationName: 'startPipeline',
                                    references: [
                                        {
                                            refType: 'CHILD_OF',
                                            traceID: '40a4a70fb2102eea',
                                            spanID: 'a3f741f24cdd01ce',
                                            span: {
                                                traceID: '40a4a70fb2102eea',
                                                spanID: 'a3f741f24cdd01ce',
                                                flags: 1,
                                                operationName: 'producer',
                                                references: [
                                                    {
                                                        refType: 'CHILD_OF',
                                                        traceID: '40a4a70fb2102eea',
                                                        spanID: 'f3750cf9e8ad044f'
                                                    }
                                                ],
                                                startTime: 1543140789907000,
                                                duration: 532000,
                                                tags: [
                                                    {
                                                        key: 'jobId',
                                                        type: 'string',
                                                        value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                    },
                                                    {
                                                        key: 'jobId',
                                                        type: 'string',
                                                        value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                    }
                                                ],
                                                logs: [],
                                                processID: 'p2',
                                                warnings: [
                                                    'invalid parent span IDs=f3750cf9e8ad044f; skipping clock skew adjustment'
                                                ],
                                                process: {
                                                    serviceName: 'pipeline-driver-queue',
                                                    tags: [
                                                        {
                                                            key: 'client-uuid',
                                                            type: 'string',
                                                            value: '15ba3b4a-e4bb-4df0-979f-f95d43e29341'
                                                        },
                                                        {
                                                            key: 'ip',
                                                            type: 'float64',
                                                            value: 183058578
                                                        },
                                                        {
                                                            key: 'jaeger.hostname',
                                                            type: 'string',
                                                            value: 'pipeline-driver-queue-86f5cd89b-c2s22'
                                                        },
                                                        {
                                                            key: 'jaeger.version',
                                                            type: 'string',
                                                            value: 'Node-3.11.0'
                                                        }
                                                    ]
                                                },
                                                relativeStartTime: 507000,
                                                depth: 0,
                                                hasChildren: true
                                            }
                                        }
                                    ],
                                    startTime: 1543140789960000,
                                    duration: 428000,
                                    tags: [
                                        {
                                            key: 'status',
                                            type: 'string',
                                            value: 'completed'
                                        }
                                    ],
                                    logs: [],
                                    processID: 'p3',
                                    warnings: null,
                                    process: {
                                        serviceName: 'pipeline-driver',
                                        tags: [
                                            {
                                                key: 'client-uuid',
                                                type: 'string',
                                                value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                            },
                                            {
                                                key: 'ip',
                                                type: 'float64',
                                                value: 183059116
                                            },
                                            {
                                                key: 'jaeger.hostname',
                                                type: 'string',
                                                value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                            },
                                            {
                                                key: 'jaeger.version',
                                                type: 'string',
                                                value: 'Node-3.13.0'
                                            }
                                        ]
                                    },
                                    relativeStartTime: 560000,
                                    depth: 1,
                                    hasChildren: true
                                }
                            }
                        ],
                        startTime: 1543140790034000,
                        duration: 10000,
                        tags: [
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                            },
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'eval-alg:5769f719-df22-4d78-8f08-ddac998cc8c7'
                            }
                        ],
                        logs: [],
                        processID: 'p3',
                        warnings: null,
                        process: {
                            serviceName: 'pipeline-driver',
                            tags: [
                                {
                                    key: 'client-uuid',
                                    type: 'string',
                                    value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                },
                                {
                                    key: 'ip',
                                    type: 'float64',
                                    value: 183059116
                                },
                                {
                                    key: 'jaeger.hostname',
                                    type: 'string',
                                    value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                },
                                {
                                    key: 'jaeger.version',
                                    type: 'string',
                                    value: 'Node-3.13.0'
                                }
                            ]
                        },
                        relativeStartTime: 634000,
                        depth: 2,
                        hasChildren: true
                    }
                }
            ],
            startTime: 1543140790254000,
            duration: 94000,
            tags: [
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                },
                {
                    key: 'taskId',
                    type: 'string',
                    value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                },
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                }
            ],
            logs: [],
            processID: 'p1',
            warnings: null,
            process: {
                serviceName: 'algorithm-queue',
                tags: [
                    {
                        key: 'client-uuid',
                        type: 'string',
                        value: 'bd92817e-d779-404f-a680-fbe27318ccf6'
                    },
                    {
                        key: 'ip',
                        type: 'float64',
                        value: 183058594
                    },
                    {
                        key: 'jaeger.hostname',
                        type: 'string',
                        value: 'algorithm-queue-eval-alg-84dd7c685b-cwslh'
                    },
                    {
                        key: 'jaeger.version',
                        type: 'string',
                        value: 'Node-3.11.0'
                    }
                ]
            },
            relativeStartTime: 854000,
            depth: 3,
            hasChildren: true
        },
        {
            traceID: '40a4a70fb2102eea',
            spanID: '5886d06fadedb7ec',
            flags: 1,
            operationName: 'eval-alg start',
            references: [
                {
                    refType: 'CHILD_OF',
                    traceID: '40a4a70fb2102eea',
                    spanID: '1d2ae94d4304d702',
                    span: {
                        traceID: '40a4a70fb2102eea',
                        spanID: '1d2ae94d4304d702',
                        flags: 1,
                        operationName: 'producer',
                        references: [
                            {
                                refType: 'CHILD_OF',
                                traceID: '40a4a70fb2102eea',
                                spanID: '1987e9ed009fc9ae',
                                span: {
                                    traceID: '40a4a70fb2102eea',
                                    spanID: '1987e9ed009fc9ae',
                                    flags: 1,
                                    operationName: 'producer',
                                    references: [
                                        {
                                            refType: 'CHILD_OF',
                                            traceID: '40a4a70fb2102eea',
                                            spanID: '64f980dff82a0b04',
                                            span: {
                                                traceID: '40a4a70fb2102eea',
                                                spanID: '64f980dff82a0b04',
                                                flags: 1,
                                                operationName: 'startPipeline',
                                                references: [
                                                    {
                                                        refType: 'CHILD_OF',
                                                        traceID: '40a4a70fb2102eea',
                                                        spanID: 'a3f741f24cdd01ce',
                                                        span: {
                                                            traceID: '40a4a70fb2102eea',
                                                            spanID: 'a3f741f24cdd01ce',
                                                            flags: 1,
                                                            operationName: 'producer',
                                                            references: [
                                                                {
                                                                    refType: 'CHILD_OF',
                                                                    traceID: '40a4a70fb2102eea',
                                                                    spanID: 'f3750cf9e8ad044f'
                                                                }
                                                            ],
                                                            startTime: 1543140789907000,
                                                            duration: 532000,
                                                            tags: [
                                                                {
                                                                    key: 'jobId',
                                                                    type: 'string',
                                                                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                                },
                                                                {
                                                                    key: 'jobId',
                                                                    type: 'string',
                                                                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                                }
                                                            ],
                                                            logs: [],
                                                            processID: 'p2',
                                                            warnings: [
                                                                'invalid parent span IDs=f3750cf9e8ad044f; skipping clock skew adjustment'
                                                            ],
                                                            process: {
                                                                serviceName: 'pipeline-driver-queue',
                                                                tags: [
                                                                    {
                                                                        key: 'client-uuid',
                                                                        type: 'string',
                                                                        value: '15ba3b4a-e4bb-4df0-979f-f95d43e29341'
                                                                    },
                                                                    {
                                                                        key: 'ip',
                                                                        type: 'float64',
                                                                        value: 183058578
                                                                    },
                                                                    {
                                                                        key: 'jaeger.hostname',
                                                                        type: 'string',
                                                                        value: 'pipeline-driver-queue-86f5cd89b-c2s22'
                                                                    },
                                                                    {
                                                                        key: 'jaeger.version',
                                                                        type: 'string',
                                                                        value: 'Node-3.11.0'
                                                                    }
                                                                ]
                                                            },
                                                            relativeStartTime: 507000,
                                                            depth: 0,
                                                            hasChildren: true
                                                        }
                                                    }
                                                ],
                                                startTime: 1543140789960000,
                                                duration: 428000,
                                                tags: [
                                                    {
                                                        key: 'status',
                                                        type: 'string',
                                                        value: 'completed'
                                                    }
                                                ],
                                                logs: [],
                                                processID: 'p3',
                                                warnings: null,
                                                process: {
                                                    serviceName: 'pipeline-driver',
                                                    tags: [
                                                        {
                                                            key: 'client-uuid',
                                                            type: 'string',
                                                            value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                                        },
                                                        {
                                                            key: 'ip',
                                                            type: 'float64',
                                                            value: 183059116
                                                        },
                                                        {
                                                            key: 'jaeger.hostname',
                                                            type: 'string',
                                                            value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                                        },
                                                        {
                                                            key: 'jaeger.version',
                                                            type: 'string',
                                                            value: 'Node-3.13.0'
                                                        }
                                                    ]
                                                },
                                                relativeStartTime: 560000,
                                                depth: 1,
                                                hasChildren: true
                                            }
                                        }
                                    ],
                                    startTime: 1543140790034000,
                                    duration: 10000,
                                    tags: [
                                        {
                                            key: 'jobId',
                                            type: 'string',
                                            value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                        },
                                        {
                                            key: 'jobId',
                                            type: 'string',
                                            value: 'eval-alg:5769f719-df22-4d78-8f08-ddac998cc8c7'
                                        }
                                    ],
                                    logs: [],
                                    processID: 'p3',
                                    warnings: null,
                                    process: {
                                        serviceName: 'pipeline-driver',
                                        tags: [
                                            {
                                                key: 'client-uuid',
                                                type: 'string',
                                                value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                            },
                                            {
                                                key: 'ip',
                                                type: 'float64',
                                                value: 183059116
                                            },
                                            {
                                                key: 'jaeger.hostname',
                                                type: 'string',
                                                value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                            },
                                            {
                                                key: 'jaeger.version',
                                                type: 'string',
                                                value: 'Node-3.13.0'
                                            }
                                        ]
                                    },
                                    relativeStartTime: 634000,
                                    depth: 2,
                                    hasChildren: true
                                }
                            }
                        ],
                        startTime: 1543140790254000,
                        duration: 94000,
                        tags: [
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                            },
                            {
                                key: 'taskId',
                                type: 'string',
                                value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                            },
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                            }
                        ],
                        logs: [],
                        processID: 'p1',
                        warnings: null,
                        process: {
                            serviceName: 'algorithm-queue',
                            tags: [
                                {
                                    key: 'client-uuid',
                                    type: 'string',
                                    value: 'bd92817e-d779-404f-a680-fbe27318ccf6'
                                },
                                {
                                    key: 'ip',
                                    type: 'float64',
                                    value: 183058594
                                },
                                {
                                    key: 'jaeger.hostname',
                                    type: 'string',
                                    value: 'algorithm-queue-eval-alg-84dd7c685b-cwslh'
                                },
                                {
                                    key: 'jaeger.version',
                                    type: 'string',
                                    value: 'Node-3.11.0'
                                }
                            ]
                        },
                        relativeStartTime: 854000,
                        depth: 3,
                        hasChildren: true
                    }
                }
            ],
            startTime: 1543140790261000,
            duration: 85000,
            tags: [
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                }
            ],
            logs: [],
            processID: 'p4',
            warnings: null,
            process: {
                serviceName: 'worker',
                tags: [
                    {
                        key: 'client-uuid',
                        type: 'string',
                        value: '6eb680df-00ff-4a92-b738-9ccb12b0a99e'
                    },
                    {
                        key: 'ip',
                        type: 'float64',
                        value: 183059125
                    },
                    {
                        key: 'jaeger.hostname',
                        type: 'string',
                        value: 'eval-alg-d3fb5404-7cf8-41de-b29c-866b5083cf60-lj5sr'
                    },
                    {
                        key: 'jaeger.version',
                        type: 'string',
                        value: 'Node-3.11.0'
                    }
                ]
            },
            relativeStartTime: 861000,
            depth: 4,
            hasChildren: false
        },
        {
            traceID: '40a4a70fb2102eea',
            spanID: '3dae54ace783a0c9',
            flags: 1,
            operationName: 'results',
            references: [
                {
                    refType: 'CHILD_OF',
                    traceID: '40a4a70fb2102eea',
                    spanID: '1d2ae94d4304d702',
                    span: {
                        traceID: '40a4a70fb2102eea',
                        spanID: '1d2ae94d4304d702',
                        flags: 1,
                        operationName: 'producer',
                        references: [
                            {
                                refType: 'CHILD_OF',
                                traceID: '40a4a70fb2102eea',
                                spanID: '1987e9ed009fc9ae',
                                span: {
                                    traceID: '40a4a70fb2102eea',
                                    spanID: '1987e9ed009fc9ae',
                                    flags: 1,
                                    operationName: 'producer',
                                    references: [
                                        {
                                            refType: 'CHILD_OF',
                                            traceID: '40a4a70fb2102eea',
                                            spanID: '64f980dff82a0b04',
                                            span: {
                                                traceID: '40a4a70fb2102eea',
                                                spanID: '64f980dff82a0b04',
                                                flags: 1,
                                                operationName: 'startPipeline',
                                                references: [
                                                    {
                                                        refType: 'CHILD_OF',
                                                        traceID: '40a4a70fb2102eea',
                                                        spanID: 'a3f741f24cdd01ce',
                                                        span: {
                                                            traceID: '40a4a70fb2102eea',
                                                            spanID: 'a3f741f24cdd01ce',
                                                            flags: 1,
                                                            operationName: 'producer',
                                                            references: [
                                                                {
                                                                    refType: 'CHILD_OF',
                                                                    traceID: '40a4a70fb2102eea',
                                                                    spanID: 'f3750cf9e8ad044f'
                                                                }
                                                            ],
                                                            startTime: 1543140789907000,
                                                            duration: 532000,
                                                            tags: [
                                                                {
                                                                    key: 'jobId',
                                                                    type: 'string',
                                                                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                                },
                                                                {
                                                                    key: 'jobId',
                                                                    type: 'string',
                                                                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                                }
                                                            ],
                                                            logs: [],
                                                            processID: 'p2',
                                                            warnings: [
                                                                'invalid parent span IDs=f3750cf9e8ad044f; skipping clock skew adjustment'
                                                            ],
                                                            process: {
                                                                serviceName: 'pipeline-driver-queue',
                                                                tags: [
                                                                    {
                                                                        key: 'client-uuid',
                                                                        type: 'string',
                                                                        value: '15ba3b4a-e4bb-4df0-979f-f95d43e29341'
                                                                    },
                                                                    {
                                                                        key: 'ip',
                                                                        type: 'float64',
                                                                        value: 183058578
                                                                    },
                                                                    {
                                                                        key: 'jaeger.hostname',
                                                                        type: 'string',
                                                                        value: 'pipeline-driver-queue-86f5cd89b-c2s22'
                                                                    },
                                                                    {
                                                                        key: 'jaeger.version',
                                                                        type: 'string',
                                                                        value: 'Node-3.11.0'
                                                                    }
                                                                ]
                                                            },
                                                            relativeStartTime: 507000,
                                                            depth: 0,
                                                            hasChildren: true
                                                        }
                                                    }
                                                ],
                                                startTime: 1543140789960000,
                                                duration: 428000,
                                                tags: [
                                                    {
                                                        key: 'status',
                                                        type: 'string',
                                                        value: 'completed'
                                                    }
                                                ],
                                                logs: [],
                                                processID: 'p3',
                                                warnings: null,
                                                process: {
                                                    serviceName: 'pipeline-driver',
                                                    tags: [
                                                        {
                                                            key: 'client-uuid',
                                                            type: 'string',
                                                            value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                                        },
                                                        {
                                                            key: 'ip',
                                                            type: 'float64',
                                                            value: 183059116
                                                        },
                                                        {
                                                            key: 'jaeger.hostname',
                                                            type: 'string',
                                                            value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                                        },
                                                        {
                                                            key: 'jaeger.version',
                                                            type: 'string',
                                                            value: 'Node-3.13.0'
                                                        }
                                                    ]
                                                },
                                                relativeStartTime: 560000,
                                                depth: 1,
                                                hasChildren: true
                                            }
                                        }
                                    ],
                                    startTime: 1543140790034000,
                                    duration: 10000,
                                    tags: [
                                        {
                                            key: 'jobId',
                                            type: 'string',
                                            value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                        },
                                        {
                                            key: 'jobId',
                                            type: 'string',
                                            value: 'eval-alg:5769f719-df22-4d78-8f08-ddac998cc8c7'
                                        }
                                    ],
                                    logs: [],
                                    processID: 'p3',
                                    warnings: null,
                                    process: {
                                        serviceName: 'pipeline-driver',
                                        tags: [
                                            {
                                                key: 'client-uuid',
                                                type: 'string',
                                                value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                            },
                                            {
                                                key: 'ip',
                                                type: 'float64',
                                                value: 183059116
                                            },
                                            {
                                                key: 'jaeger.hostname',
                                                type: 'string',
                                                value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                            },
                                            {
                                                key: 'jaeger.version',
                                                type: 'string',
                                                value: 'Node-3.13.0'
                                            }
                                        ]
                                    },
                                    relativeStartTime: 634000,
                                    depth: 2,
                                    hasChildren: true
                                }
                            }
                        ],
                        startTime: 1543140790254000,
                        duration: 94000,
                        tags: [
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                            },
                            {
                                key: 'taskId',
                                type: 'string',
                                value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                            },
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                            }
                        ],
                        logs: [],
                        processID: 'p1',
                        warnings: null,
                        process: {
                            serviceName: 'algorithm-queue',
                            tags: [
                                {
                                    key: 'client-uuid',
                                    type: 'string',
                                    value: 'bd92817e-d779-404f-a680-fbe27318ccf6'
                                },
                                {
                                    key: 'ip',
                                    type: 'float64',
                                    value: 183058594
                                },
                                {
                                    key: 'jaeger.hostname',
                                    type: 'string',
                                    value: 'algorithm-queue-eval-alg-84dd7c685b-cwslh'
                                },
                                {
                                    key: 'jaeger.version',
                                    type: 'string',
                                    value: 'Node-3.11.0'
                                }
                            ]
                        },
                        relativeStartTime: 854000,
                        depth: 3,
                        hasChildren: true
                    }
                }
            ],
            startTime: 1543140790269500,
            duration: 63000,
            tags: [
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                },
                {
                    key: 'taskId',
                    type: 'string',
                    value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                }
            ],
            logs: [],
            processID: 'p4',
            warnings: null,
            process: {
                serviceName: 'worker',
                tags: [
                    {
                        key: 'client-uuid',
                        type: 'string',
                        value: '6eb680df-00ff-4a92-b738-9ccb12b0a99e'
                    },
                    {
                        key: 'ip',
                        type: 'float64',
                        value: 183059125
                    },
                    {
                        key: 'jaeger.hostname',
                        type: 'string',
                        value: 'eval-alg-d3fb5404-7cf8-41de-b29c-866b5083cf60-lj5sr'
                    },
                    {
                        key: 'jaeger.version',
                        type: 'string',
                        value: 'Node-3.11.0'
                    }
                ]
            },
            relativeStartTime: 869500,
            depth: 4,
            hasChildren: true
        },
        {
            traceID: '40a4a70fb2102eea',
            spanID: 'f5e7bf657b937e3c',
            flags: 1,
            operationName: 'storage-put',
            references: [
                {
                    refType: 'CHILD_OF',
                    traceID: '40a4a70fb2102eea',
                    spanID: '3dae54ace783a0c9',
                    span: {
                        traceID: '40a4a70fb2102eea',
                        spanID: '3dae54ace783a0c9',
                        flags: 1,
                        operationName: 'results',
                        references: [
                            {
                                refType: 'CHILD_OF',
                                traceID: '40a4a70fb2102eea',
                                spanID: '1d2ae94d4304d702',
                                span: {
                                    traceID: '40a4a70fb2102eea',
                                    spanID: '1d2ae94d4304d702',
                                    flags: 1,
                                    operationName: 'producer',
                                    references: [
                                        {
                                            refType: 'CHILD_OF',
                                            traceID: '40a4a70fb2102eea',
                                            spanID: '1987e9ed009fc9ae',
                                            span: {
                                                traceID: '40a4a70fb2102eea',
                                                spanID: '1987e9ed009fc9ae',
                                                flags: 1,
                                                operationName: 'producer',
                                                references: [
                                                    {
                                                        refType: 'CHILD_OF',
                                                        traceID: '40a4a70fb2102eea',
                                                        spanID: '64f980dff82a0b04',
                                                        span: {
                                                            traceID: '40a4a70fb2102eea',
                                                            spanID: '64f980dff82a0b04',
                                                            flags: 1,
                                                            operationName: 'startPipeline',
                                                            references: [
                                                                {
                                                                    refType: 'CHILD_OF',
                                                                    traceID: '40a4a70fb2102eea',
                                                                    spanID: 'a3f741f24cdd01ce',
                                                                    span: {
                                                                        traceID: '40a4a70fb2102eea',
                                                                        spanID: 'a3f741f24cdd01ce',
                                                                        flags: 1,
                                                                        operationName: 'producer',
                                                                        references: [
                                                                            {
                                                                                refType: 'CHILD_OF',
                                                                                traceID: '40a4a70fb2102eea',
                                                                                spanID: 'f3750cf9e8ad044f'
                                                                            }
                                                                        ],
                                                                        startTime: 1543140789907000,
                                                                        duration: 532000,
                                                                        tags: [
                                                                            {
                                                                                key: 'jobId',
                                                                                type: 'string',
                                                                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                                            },
                                                                            {
                                                                                key: 'jobId',
                                                                                type: 'string',
                                                                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                                            }
                                                                        ],
                                                                        logs: [],
                                                                        processID: 'p2',
                                                                        warnings: [
                                                                            'invalid parent span IDs=f3750cf9e8ad044f; skipping clock skew adjustment'
                                                                        ],
                                                                        process: {
                                                                            serviceName: 'pipeline-driver-queue',
                                                                            tags: [
                                                                                {
                                                                                    key: 'client-uuid',
                                                                                    type: 'string',
                                                                                    value: '15ba3b4a-e4bb-4df0-979f-f95d43e29341'
                                                                                },
                                                                                {
                                                                                    key: 'ip',
                                                                                    type: 'float64',
                                                                                    value: 183058578
                                                                                },
                                                                                {
                                                                                    key: 'jaeger.hostname',
                                                                                    type: 'string',
                                                                                    value: 'pipeline-driver-queue-86f5cd89b-c2s22'
                                                                                },
                                                                                {
                                                                                    key: 'jaeger.version',
                                                                                    type: 'string',
                                                                                    value: 'Node-3.11.0'
                                                                                }
                                                                            ]
                                                                        },
                                                                        relativeStartTime: 507000,
                                                                        depth: 0,
                                                                        hasChildren: true
                                                                    }
                                                                }
                                                            ],
                                                            startTime: 1543140789960000,
                                                            duration: 428000,
                                                            tags: [
                                                                {
                                                                    key: 'status',
                                                                    type: 'string',
                                                                    value: 'completed'
                                                                }
                                                            ],
                                                            logs: [],
                                                            processID: 'p3',
                                                            warnings: null,
                                                            process: {
                                                                serviceName: 'pipeline-driver',
                                                                tags: [
                                                                    {
                                                                        key: 'client-uuid',
                                                                        type: 'string',
                                                                        value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                                                    },
                                                                    {
                                                                        key: 'ip',
                                                                        type: 'float64',
                                                                        value: 183059116
                                                                    },
                                                                    {
                                                                        key: 'jaeger.hostname',
                                                                        type: 'string',
                                                                        value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                                                    },
                                                                    {
                                                                        key: 'jaeger.version',
                                                                        type: 'string',
                                                                        value: 'Node-3.13.0'
                                                                    }
                                                                ]
                                                            },
                                                            relativeStartTime: 560000,
                                                            depth: 1,
                                                            hasChildren: true
                                                        }
                                                    }
                                                ],
                                                startTime: 1543140790034000,
                                                duration: 10000,
                                                tags: [
                                                    {
                                                        key: 'jobId',
                                                        type: 'string',
                                                        value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                    },
                                                    {
                                                        key: 'jobId',
                                                        type: 'string',
                                                        value: 'eval-alg:5769f719-df22-4d78-8f08-ddac998cc8c7'
                                                    }
                                                ],
                                                logs: [],
                                                processID: 'p3',
                                                warnings: null,
                                                process: {
                                                    serviceName: 'pipeline-driver',
                                                    tags: [
                                                        {
                                                            key: 'client-uuid',
                                                            type: 'string',
                                                            value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                                        },
                                                        {
                                                            key: 'ip',
                                                            type: 'float64',
                                                            value: 183059116
                                                        },
                                                        {
                                                            key: 'jaeger.hostname',
                                                            type: 'string',
                                                            value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                                        },
                                                        {
                                                            key: 'jaeger.version',
                                                            type: 'string',
                                                            value: 'Node-3.13.0'
                                                        }
                                                    ]
                                                },
                                                relativeStartTime: 634000,
                                                depth: 2,
                                                hasChildren: true
                                            }
                                        }
                                    ],
                                    startTime: 1543140790254000,
                                    duration: 94000,
                                    tags: [
                                        {
                                            key: 'jobId',
                                            type: 'string',
                                            value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                        },
                                        {
                                            key: 'taskId',
                                            type: 'string',
                                            value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                                        },
                                        {
                                            key: 'jobId',
                                            type: 'string',
                                            value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                                        }
                                    ],
                                    logs: [],
                                    processID: 'p1',
                                    warnings: null,
                                    process: {
                                        serviceName: 'algorithm-queue',
                                        tags: [
                                            {
                                                key: 'client-uuid',
                                                type: 'string',
                                                value: 'bd92817e-d779-404f-a680-fbe27318ccf6'
                                            },
                                            {
                                                key: 'ip',
                                                type: 'float64',
                                                value: 183058594
                                            },
                                            {
                                                key: 'jaeger.hostname',
                                                type: 'string',
                                                value: 'algorithm-queue-eval-alg-84dd7c685b-cwslh'
                                            },
                                            {
                                                key: 'jaeger.version',
                                                type: 'string',
                                                value: 'Node-3.11.0'
                                            }
                                        ]
                                    },
                                    relativeStartTime: 854000,
                                    depth: 3,
                                    hasChildren: true
                                }
                            }
                        ],
                        startTime: 1543140790269500,
                        duration: 63000,
                        tags: [
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                            },
                            {
                                key: 'taskId',
                                type: 'string',
                                value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                            }
                        ],
                        logs: [],
                        processID: 'p4',
                        warnings: null,
                        process: {
                            serviceName: 'worker',
                            tags: [
                                {
                                    key: 'client-uuid',
                                    type: 'string',
                                    value: '6eb680df-00ff-4a92-b738-9ccb12b0a99e'
                                },
                                {
                                    key: 'ip',
                                    type: 'float64',
                                    value: 183059125
                                },
                                {
                                    key: 'jaeger.hostname',
                                    type: 'string',
                                    value: 'eval-alg-d3fb5404-7cf8-41de-b29c-866b5083cf60-lj5sr'
                                },
                                {
                                    key: 'jaeger.version',
                                    type: 'string',
                                    value: 'Node-3.11.0'
                                }
                            ]
                        },
                        relativeStartTime: 869500,
                        depth: 4,
                        hasChildren: true
                    }
                }
            ],
            startTime: 1543140790301000,
            duration: 19000,
            tags: [
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                },
                {
                    key: 'taskId',
                    type: 'string',
                    value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                }
            ],
            logs: [],
            processID: 'p4',
            warnings: null,
            process: {
                serviceName: 'worker',
                tags: [
                    {
                        key: 'client-uuid',
                        type: 'string',
                        value: '6eb680df-00ff-4a92-b738-9ccb12b0a99e'
                    },
                    {
                        key: 'ip',
                        type: 'float64',
                        value: 183059125
                    },
                    {
                        key: 'jaeger.hostname',
                        type: 'string',
                        value: 'eval-alg-d3fb5404-7cf8-41de-b29c-866b5083cf60-lj5sr'
                    },
                    {
                        key: 'jaeger.version',
                        type: 'string',
                        value: 'Node-3.11.0'
                    }
                ]
            },
            relativeStartTime: 901000,
            depth: 5,
            hasChildren: false
        },
        {
            traceID: '40a4a70fb2102eea',
            spanID: '7f6348ecd9946b57',
            flags: 1,
            operationName: 'init',
            references: [
                {
                    refType: 'CHILD_OF',
                    traceID: '40a4a70fb2102eea',
                    spanID: '1d2ae94d4304d702',
                    span: {
                        traceID: '40a4a70fb2102eea',
                        spanID: '1d2ae94d4304d702',
                        flags: 1,
                        operationName: 'producer',
                        references: [
                            {
                                refType: 'CHILD_OF',
                                traceID: '40a4a70fb2102eea',
                                spanID: '1987e9ed009fc9ae',
                                span: {
                                    traceID: '40a4a70fb2102eea',
                                    spanID: '1987e9ed009fc9ae',
                                    flags: 1,
                                    operationName: 'producer',
                                    references: [
                                        {
                                            refType: 'CHILD_OF',
                                            traceID: '40a4a70fb2102eea',
                                            spanID: '64f980dff82a0b04',
                                            span: {
                                                traceID: '40a4a70fb2102eea',
                                                spanID: '64f980dff82a0b04',
                                                flags: 1,
                                                operationName: 'startPipeline',
                                                references: [
                                                    {
                                                        refType: 'CHILD_OF',
                                                        traceID: '40a4a70fb2102eea',
                                                        spanID: 'a3f741f24cdd01ce',
                                                        span: {
                                                            traceID: '40a4a70fb2102eea',
                                                            spanID: 'a3f741f24cdd01ce',
                                                            flags: 1,
                                                            operationName: 'producer',
                                                            references: [
                                                                {
                                                                    refType: 'CHILD_OF',
                                                                    traceID: '40a4a70fb2102eea',
                                                                    spanID: 'f3750cf9e8ad044f'
                                                                }
                                                            ],
                                                            startTime: 1543140789907000,
                                                            duration: 532000,
                                                            tags: [
                                                                {
                                                                    key: 'jobId',
                                                                    type: 'string',
                                                                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                                },
                                                                {
                                                                    key: 'jobId',
                                                                    type: 'string',
                                                                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                                }
                                                            ],
                                                            logs: [],
                                                            processID: 'p2',
                                                            warnings: [
                                                                'invalid parent span IDs=f3750cf9e8ad044f; skipping clock skew adjustment'
                                                            ],
                                                            process: {
                                                                serviceName: 'pipeline-driver-queue',
                                                                tags: [
                                                                    {
                                                                        key: 'client-uuid',
                                                                        type: 'string',
                                                                        value: '15ba3b4a-e4bb-4df0-979f-f95d43e29341'
                                                                    },
                                                                    {
                                                                        key: 'ip',
                                                                        type: 'float64',
                                                                        value: 183058578
                                                                    },
                                                                    {
                                                                        key: 'jaeger.hostname',
                                                                        type: 'string',
                                                                        value: 'pipeline-driver-queue-86f5cd89b-c2s22'
                                                                    },
                                                                    {
                                                                        key: 'jaeger.version',
                                                                        type: 'string',
                                                                        value: 'Node-3.11.0'
                                                                    }
                                                                ]
                                                            },
                                                            relativeStartTime: 507000,
                                                            depth: 0,
                                                            hasChildren: true
                                                        }
                                                    }
                                                ],
                                                startTime: 1543140789960000,
                                                duration: 428000,
                                                tags: [
                                                    {
                                                        key: 'status',
                                                        type: 'string',
                                                        value: 'completed'
                                                    }
                                                ],
                                                logs: [],
                                                processID: 'p3',
                                                warnings: null,
                                                process: {
                                                    serviceName: 'pipeline-driver',
                                                    tags: [
                                                        {
                                                            key: 'client-uuid',
                                                            type: 'string',
                                                            value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                                        },
                                                        {
                                                            key: 'ip',
                                                            type: 'float64',
                                                            value: 183059116
                                                        },
                                                        {
                                                            key: 'jaeger.hostname',
                                                            type: 'string',
                                                            value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                                        },
                                                        {
                                                            key: 'jaeger.version',
                                                            type: 'string',
                                                            value: 'Node-3.13.0'
                                                        }
                                                    ]
                                                },
                                                relativeStartTime: 560000,
                                                depth: 1,
                                                hasChildren: true
                                            }
                                        }
                                    ],
                                    startTime: 1543140790034000,
                                    duration: 10000,
                                    tags: [
                                        {
                                            key: 'jobId',
                                            type: 'string',
                                            value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                        },
                                        {
                                            key: 'jobId',
                                            type: 'string',
                                            value: 'eval-alg:5769f719-df22-4d78-8f08-ddac998cc8c7'
                                        }
                                    ],
                                    logs: [],
                                    processID: 'p3',
                                    warnings: null,
                                    process: {
                                        serviceName: 'pipeline-driver',
                                        tags: [
                                            {
                                                key: 'client-uuid',
                                                type: 'string',
                                                value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                            },
                                            {
                                                key: 'ip',
                                                type: 'float64',
                                                value: 183059116
                                            },
                                            {
                                                key: 'jaeger.hostname',
                                                type: 'string',
                                                value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                            },
                                            {
                                                key: 'jaeger.version',
                                                type: 'string',
                                                value: 'Node-3.13.0'
                                            }
                                        ]
                                    },
                                    relativeStartTime: 634000,
                                    depth: 2,
                                    hasChildren: true
                                }
                            }
                        ],
                        startTime: 1543140790254000,
                        duration: 94000,
                        tags: [
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                            },
                            {
                                key: 'taskId',
                                type: 'string',
                                value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                            },
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                            }
                        ],
                        logs: [],
                        processID: 'p1',
                        warnings: null,
                        process: {
                            serviceName: 'algorithm-queue',
                            tags: [
                                {
                                    key: 'client-uuid',
                                    type: 'string',
                                    value: 'bd92817e-d779-404f-a680-fbe27318ccf6'
                                },
                                {
                                    key: 'ip',
                                    type: 'float64',
                                    value: 183058594
                                },
                                {
                                    key: 'jaeger.hostname',
                                    type: 'string',
                                    value: 'algorithm-queue-eval-alg-84dd7c685b-cwslh'
                                },
                                {
                                    key: 'jaeger.version',
                                    type: 'string',
                                    value: 'Node-3.11.0'
                                }
                            ]
                        },
                        relativeStartTime: 854000,
                        depth: 3,
                        hasChildren: true
                    }
                }
            ],
            startTime: 1543140790283000,
            duration: 11000,
            tags: [
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                },
                {
                    key: 'taskId',
                    type: 'string',
                    value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                }
            ],
            logs: [],
            processID: 'p4',
            warnings: null,
            process: {
                serviceName: 'worker',
                tags: [
                    {
                        key: 'client-uuid',
                        type: 'string',
                        value: '6eb680df-00ff-4a92-b738-9ccb12b0a99e'
                    },
                    {
                        key: 'ip',
                        type: 'float64',
                        value: 183059125
                    },
                    {
                        key: 'jaeger.hostname',
                        type: 'string',
                        value: 'eval-alg-d3fb5404-7cf8-41de-b29c-866b5083cf60-lj5sr'
                    },
                    {
                        key: 'jaeger.version',
                        type: 'string',
                        value: 'Node-3.11.0'
                    }
                ]
            },
            relativeStartTime: 883000,
            depth: 4,
            hasChildren: true
        },
        {
            traceID: '40a4a70fb2102eea',
            spanID: 'eec5a76af5fb1911',
            flags: 1,
            operationName: 'storage-get',
            references: [
                {
                    refType: 'CHILD_OF',
                    traceID: '40a4a70fb2102eea',
                    spanID: '7f6348ecd9946b57',
                    span: {
                        traceID: '40a4a70fb2102eea',
                        spanID: '7f6348ecd9946b57',
                        flags: 1,
                        operationName: 'init',
                        references: [
                            {
                                refType: 'CHILD_OF',
                                traceID: '40a4a70fb2102eea',
                                spanID: '1d2ae94d4304d702',
                                span: {
                                    traceID: '40a4a70fb2102eea',
                                    spanID: '1d2ae94d4304d702',
                                    flags: 1,
                                    operationName: 'producer',
                                    references: [
                                        {
                                            refType: 'CHILD_OF',
                                            traceID: '40a4a70fb2102eea',
                                            spanID: '1987e9ed009fc9ae',
                                            span: {
                                                traceID: '40a4a70fb2102eea',
                                                spanID: '1987e9ed009fc9ae',
                                                flags: 1,
                                                operationName: 'producer',
                                                references: [
                                                    {
                                                        refType: 'CHILD_OF',
                                                        traceID: '40a4a70fb2102eea',
                                                        spanID: '64f980dff82a0b04',
                                                        span: {
                                                            traceID: '40a4a70fb2102eea',
                                                            spanID: '64f980dff82a0b04',
                                                            flags: 1,
                                                            operationName: 'startPipeline',
                                                            references: [
                                                                {
                                                                    refType: 'CHILD_OF',
                                                                    traceID: '40a4a70fb2102eea',
                                                                    spanID: 'a3f741f24cdd01ce',
                                                                    span: {
                                                                        traceID: '40a4a70fb2102eea',
                                                                        spanID: 'a3f741f24cdd01ce',
                                                                        flags: 1,
                                                                        operationName: 'producer',
                                                                        references: [
                                                                            {
                                                                                refType: 'CHILD_OF',
                                                                                traceID: '40a4a70fb2102eea',
                                                                                spanID: 'f3750cf9e8ad044f'
                                                                            }
                                                                        ],
                                                                        startTime: 1543140789907000,
                                                                        duration: 532000,
                                                                        tags: [
                                                                            {
                                                                                key: 'jobId',
                                                                                type: 'string',
                                                                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                                            },
                                                                            {
                                                                                key: 'jobId',
                                                                                type: 'string',
                                                                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                                            }
                                                                        ],
                                                                        logs: [],
                                                                        processID: 'p2',
                                                                        warnings: [
                                                                            'invalid parent span IDs=f3750cf9e8ad044f; skipping clock skew adjustment'
                                                                        ],
                                                                        process: {
                                                                            serviceName: 'pipeline-driver-queue',
                                                                            tags: [
                                                                                {
                                                                                    key: 'client-uuid',
                                                                                    type: 'string',
                                                                                    value: '15ba3b4a-e4bb-4df0-979f-f95d43e29341'
                                                                                },
                                                                                {
                                                                                    key: 'ip',
                                                                                    type: 'float64',
                                                                                    value: 183058578
                                                                                },
                                                                                {
                                                                                    key: 'jaeger.hostname',
                                                                                    type: 'string',
                                                                                    value: 'pipeline-driver-queue-86f5cd89b-c2s22'
                                                                                },
                                                                                {
                                                                                    key: 'jaeger.version',
                                                                                    type: 'string',
                                                                                    value: 'Node-3.11.0'
                                                                                }
                                                                            ]
                                                                        },
                                                                        relativeStartTime: 507000,
                                                                        depth: 0,
                                                                        hasChildren: true
                                                                    }
                                                                }
                                                            ],
                                                            startTime: 1543140789960000,
                                                            duration: 428000,
                                                            tags: [
                                                                {
                                                                    key: 'status',
                                                                    type: 'string',
                                                                    value: 'completed'
                                                                }
                                                            ],
                                                            logs: [],
                                                            processID: 'p3',
                                                            warnings: null,
                                                            process: {
                                                                serviceName: 'pipeline-driver',
                                                                tags: [
                                                                    {
                                                                        key: 'client-uuid',
                                                                        type: 'string',
                                                                        value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                                                    },
                                                                    {
                                                                        key: 'ip',
                                                                        type: 'float64',
                                                                        value: 183059116
                                                                    },
                                                                    {
                                                                        key: 'jaeger.hostname',
                                                                        type: 'string',
                                                                        value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                                                    },
                                                                    {
                                                                        key: 'jaeger.version',
                                                                        type: 'string',
                                                                        value: 'Node-3.13.0'
                                                                    }
                                                                ]
                                                            },
                                                            relativeStartTime: 560000,
                                                            depth: 1,
                                                            hasChildren: true
                                                        }
                                                    }
                                                ],
                                                startTime: 1543140790034000,
                                                duration: 10000,
                                                tags: [
                                                    {
                                                        key: 'jobId',
                                                        type: 'string',
                                                        value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                    },
                                                    {
                                                        key: 'jobId',
                                                        type: 'string',
                                                        value: 'eval-alg:5769f719-df22-4d78-8f08-ddac998cc8c7'
                                                    }
                                                ],
                                                logs: [],
                                                processID: 'p3',
                                                warnings: null,
                                                process: {
                                                    serviceName: 'pipeline-driver',
                                                    tags: [
                                                        {
                                                            key: 'client-uuid',
                                                            type: 'string',
                                                            value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                                        },
                                                        {
                                                            key: 'ip',
                                                            type: 'float64',
                                                            value: 183059116
                                                        },
                                                        {
                                                            key: 'jaeger.hostname',
                                                            type: 'string',
                                                            value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                                        },
                                                        {
                                                            key: 'jaeger.version',
                                                            type: 'string',
                                                            value: 'Node-3.13.0'
                                                        }
                                                    ]
                                                },
                                                relativeStartTime: 634000,
                                                depth: 2,
                                                hasChildren: true
                                            }
                                        }
                                    ],
                                    startTime: 1543140790254000,
                                    duration: 94000,
                                    tags: [
                                        {
                                            key: 'jobId',
                                            type: 'string',
                                            value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                        },
                                        {
                                            key: 'taskId',
                                            type: 'string',
                                            value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                                        },
                                        {
                                            key: 'jobId',
                                            type: 'string',
                                            value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                                        }
                                    ],
                                    logs: [],
                                    processID: 'p1',
                                    warnings: null,
                                    process: {
                                        serviceName: 'algorithm-queue',
                                        tags: [
                                            {
                                                key: 'client-uuid',
                                                type: 'string',
                                                value: 'bd92817e-d779-404f-a680-fbe27318ccf6'
                                            },
                                            {
                                                key: 'ip',
                                                type: 'float64',
                                                value: 183058594
                                            },
                                            {
                                                key: 'jaeger.hostname',
                                                type: 'string',
                                                value: 'algorithm-queue-eval-alg-84dd7c685b-cwslh'
                                            },
                                            {
                                                key: 'jaeger.version',
                                                type: 'string',
                                                value: 'Node-3.11.0'
                                            }
                                        ]
                                    },
                                    relativeStartTime: 854000,
                                    depth: 3,
                                    hasChildren: true
                                }
                            }
                        ],
                        startTime: 1543140790283000,
                        duration: 11000,
                        tags: [
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                            },
                            {
                                key: 'taskId',
                                type: 'string',
                                value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                            }
                        ],
                        logs: [],
                        processID: 'p4',
                        warnings: null,
                        process: {
                            serviceName: 'worker',
                            tags: [
                                {
                                    key: 'client-uuid',
                                    type: 'string',
                                    value: '6eb680df-00ff-4a92-b738-9ccb12b0a99e'
                                },
                                {
                                    key: 'ip',
                                    type: 'float64',
                                    value: 183059125
                                },
                                {
                                    key: 'jaeger.hostname',
                                    type: 'string',
                                    value: 'eval-alg-d3fb5404-7cf8-41de-b29c-866b5083cf60-lj5sr'
                                },
                                {
                                    key: 'jaeger.version',
                                    type: 'string',
                                    value: 'Node-3.11.0'
                                }
                            ]
                        },
                        relativeStartTime: 883000,
                        depth: 4,
                        hasChildren: true
                    }
                }
            ],
            startTime: 1543140790284000,
            duration: 9000,
            tags: [
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                },
                {
                    key: 'taskId',
                    type: 'string',
                    value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                }
            ],
            logs: [],
            processID: 'p4',
            warnings: null,
            process: {
                serviceName: 'worker',
                tags: [
                    {
                        key: 'client-uuid',
                        type: 'string',
                        value: '6eb680df-00ff-4a92-b738-9ccb12b0a99e'
                    },
                    {
                        key: 'ip',
                        type: 'float64',
                        value: 183059125
                    },
                    {
                        key: 'jaeger.hostname',
                        type: 'string',
                        value: 'eval-alg-d3fb5404-7cf8-41de-b29c-866b5083cf60-lj5sr'
                    },
                    {
                        key: 'jaeger.version',
                        type: 'string',
                        value: 'Node-3.11.0'
                    }
                ]
            },
            relativeStartTime: 884000,
            depth: 5,
            hasChildren: false
        },
        {
            traceID: '40a4a70fb2102eea',
            spanID: 'f5f1299cb1b0994f',
            flags: 1,
            operationName: 'working',
            references: [
                {
                    refType: 'CHILD_OF',
                    traceID: '40a4a70fb2102eea',
                    spanID: '1d2ae94d4304d702',
                    span: {
                        traceID: '40a4a70fb2102eea',
                        spanID: '1d2ae94d4304d702',
                        flags: 1,
                        operationName: 'producer',
                        references: [
                            {
                                refType: 'CHILD_OF',
                                traceID: '40a4a70fb2102eea',
                                spanID: '1987e9ed009fc9ae',
                                span: {
                                    traceID: '40a4a70fb2102eea',
                                    spanID: '1987e9ed009fc9ae',
                                    flags: 1,
                                    operationName: 'producer',
                                    references: [
                                        {
                                            refType: 'CHILD_OF',
                                            traceID: '40a4a70fb2102eea',
                                            spanID: '64f980dff82a0b04',
                                            span: {
                                                traceID: '40a4a70fb2102eea',
                                                spanID: '64f980dff82a0b04',
                                                flags: 1,
                                                operationName: 'startPipeline',
                                                references: [
                                                    {
                                                        refType: 'CHILD_OF',
                                                        traceID: '40a4a70fb2102eea',
                                                        spanID: 'a3f741f24cdd01ce',
                                                        span: {
                                                            traceID: '40a4a70fb2102eea',
                                                            spanID: 'a3f741f24cdd01ce',
                                                            flags: 1,
                                                            operationName: 'producer',
                                                            references: [
                                                                {
                                                                    refType: 'CHILD_OF',
                                                                    traceID: '40a4a70fb2102eea',
                                                                    spanID: 'f3750cf9e8ad044f'
                                                                }
                                                            ],
                                                            startTime: 1543140789907000,
                                                            duration: 532000,
                                                            tags: [
                                                                {
                                                                    key: 'jobId',
                                                                    type: 'string',
                                                                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                                },
                                                                {
                                                                    key: 'jobId',
                                                                    type: 'string',
                                                                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                                                }
                                                            ],
                                                            logs: [],
                                                            processID: 'p2',
                                                            warnings: [
                                                                'invalid parent span IDs=f3750cf9e8ad044f; skipping clock skew adjustment'
                                                            ],
                                                            process: {
                                                                serviceName: 'pipeline-driver-queue',
                                                                tags: [
                                                                    {
                                                                        key: 'client-uuid',
                                                                        type: 'string',
                                                                        value: '15ba3b4a-e4bb-4df0-979f-f95d43e29341'
                                                                    },
                                                                    {
                                                                        key: 'ip',
                                                                        type: 'float64',
                                                                        value: 183058578
                                                                    },
                                                                    {
                                                                        key: 'jaeger.hostname',
                                                                        type: 'string',
                                                                        value: 'pipeline-driver-queue-86f5cd89b-c2s22'
                                                                    },
                                                                    {
                                                                        key: 'jaeger.version',
                                                                        type: 'string',
                                                                        value: 'Node-3.11.0'
                                                                    }
                                                                ]
                                                            },
                                                            relativeStartTime: 507000,
                                                            depth: 0,
                                                            hasChildren: true
                                                        }
                                                    }
                                                ],
                                                startTime: 1543140789960000,
                                                duration: 428000,
                                                tags: [
                                                    {
                                                        key: 'status',
                                                        type: 'string',
                                                        value: 'completed'
                                                    }
                                                ],
                                                logs: [],
                                                processID: 'p3',
                                                warnings: null,
                                                process: {
                                                    serviceName: 'pipeline-driver',
                                                    tags: [
                                                        {
                                                            key: 'client-uuid',
                                                            type: 'string',
                                                            value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                                        },
                                                        {
                                                            key: 'ip',
                                                            type: 'float64',
                                                            value: 183059116
                                                        },
                                                        {
                                                            key: 'jaeger.hostname',
                                                            type: 'string',
                                                            value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                                        },
                                                        {
                                                            key: 'jaeger.version',
                                                            type: 'string',
                                                            value: 'Node-3.13.0'
                                                        }
                                                    ]
                                                },
                                                relativeStartTime: 560000,
                                                depth: 1,
                                                hasChildren: true
                                            }
                                        }
                                    ],
                                    startTime: 1543140790034000,
                                    duration: 10000,
                                    tags: [
                                        {
                                            key: 'jobId',
                                            type: 'string',
                                            value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                                        },
                                        {
                                            key: 'jobId',
                                            type: 'string',
                                            value: 'eval-alg:5769f719-df22-4d78-8f08-ddac998cc8c7'
                                        }
                                    ],
                                    logs: [],
                                    processID: 'p3',
                                    warnings: null,
                                    process: {
                                        serviceName: 'pipeline-driver',
                                        tags: [
                                            {
                                                key: 'client-uuid',
                                                type: 'string',
                                                value: '33d1b87a-5362-412a-ada1-24d75858f666'
                                            },
                                            {
                                                key: 'ip',
                                                type: 'float64',
                                                value: 183059116
                                            },
                                            {
                                                key: 'jaeger.hostname',
                                                type: 'string',
                                                value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                                            },
                                            {
                                                key: 'jaeger.version',
                                                type: 'string',
                                                value: 'Node-3.13.0'
                                            }
                                        ]
                                    },
                                    relativeStartTime: 634000,
                                    depth: 2,
                                    hasChildren: true
                                }
                            }
                        ],
                        startTime: 1543140790254000,
                        duration: 94000,
                        tags: [
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                            },
                            {
                                key: 'taskId',
                                type: 'string',
                                value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                            },
                            {
                                key: 'jobId',
                                type: 'string',
                                value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                            }
                        ],
                        logs: [],
                        processID: 'p1',
                        warnings: null,
                        process: {
                            serviceName: 'algorithm-queue',
                            tags: [
                                {
                                    key: 'client-uuid',
                                    type: 'string',
                                    value: 'bd92817e-d779-404f-a680-fbe27318ccf6'
                                },
                                {
                                    key: 'ip',
                                    type: 'float64',
                                    value: 183058594
                                },
                                {
                                    key: 'jaeger.hostname',
                                    type: 'string',
                                    value: 'algorithm-queue-eval-alg-84dd7c685b-cwslh'
                                },
                                {
                                    key: 'jaeger.version',
                                    type: 'string',
                                    value: 'Node-3.11.0'
                                }
                            ]
                        },
                        relativeStartTime: 854000,
                        depth: 3,
                        hasChildren: true
                    }
                }
            ],
            startTime: 1543140790295000,
            duration: 2000,
            tags: [
                {
                    key: 'jobId',
                    type: 'string',
                    value: 'bool:669dacca-999e-4f91-9380-a603683ab1f9.bool'
                },
                {
                    key: 'taskId',
                    type: 'string',
                    value: 'trueFalse:eval-alg:4d467a68-36eb-42e6-8324-6a82cb087cef'
                }
            ],
            logs: [],
            processID: 'p4',
            warnings: null,
            process: {
                serviceName: 'worker',
                tags: [
                    {
                        key: 'client-uuid',
                        type: 'string',
                        value: '6eb680df-00ff-4a92-b738-9ccb12b0a99e'
                    },
                    {
                        key: 'ip',
                        type: 'float64',
                        value: 183059125
                    },
                    {
                        key: 'jaeger.hostname',
                        type: 'string',
                        value: 'eval-alg-d3fb5404-7cf8-41de-b29c-866b5083cf60-lj5sr'
                    },
                    {
                        key: 'jaeger.version',
                        type: 'string',
                        value: 'Node-3.11.0'
                    }
                ]
            },
            relativeStartTime: 895000,
            depth: 4,
            hasChildren: false
        }
    ],
    traceID: '40a4a70fb2102eea',
    traceName: 'api-server: run pipeline',
    processes: {
        p1: {
            serviceName: 'algorithm-queue',
            tags: [
                {
                    key: 'client-uuid',
                    type: 'string',
                    value: 'bd92817e-d779-404f-a680-fbe27318ccf6'
                },
                {
                    key: 'ip',
                    type: 'float64',
                    value: 183058594
                },
                {
                    key: 'jaeger.hostname',
                    type: 'string',
                    value: 'algorithm-queue-eval-alg-84dd7c685b-cwslh'
                },
                {
                    key: 'jaeger.version',
                    type: 'string',
                    value: 'Node-3.11.0'
                }
            ]
        },
        p2: {
            serviceName: 'pipeline-driver-queue',
            tags: [
                {
                    key: 'client-uuid',
                    type: 'string',
                    value: '15ba3b4a-e4bb-4df0-979f-f95d43e29341'
                },
                {
                    key: 'ip',
                    type: 'float64',
                    value: 183058578
                },
                {
                    key: 'jaeger.hostname',
                    type: 'string',
                    value: 'pipeline-driver-queue-86f5cd89b-c2s22'
                },
                {
                    key: 'jaeger.version',
                    type: 'string',
                    value: 'Node-3.11.0'
                }
            ]
        },
        p3: {
            serviceName: 'pipeline-driver',
            tags: [
                {
                    key: 'client-uuid',
                    type: 'string',
                    value: '33d1b87a-5362-412a-ada1-24d75858f666'
                },
                {
                    key: 'ip',
                    type: 'float64',
                    value: 183059116
                },
                {
                    key: 'jaeger.hostname',
                    type: 'string',
                    value: 'pipeline-driver-71c9901f-1e3b-4706-a2b6-b8da0e837870-djmrt'
                },
                {
                    key: 'jaeger.version',
                    type: 'string',
                    value: 'Node-3.13.0'
                }
            ]
        },
        p4: {
            serviceName: 'worker',
            tags: [
                {
                    key: 'client-uuid',
                    type: 'string',
                    value: '6eb680df-00ff-4a92-b738-9ccb12b0a99e'
                },
                {
                    key: 'ip',
                    type: 'float64',
                    value: 183059125
                },
                {
                    key: 'jaeger.hostname',
                    type: 'string',
                    value: 'eval-alg-d3fb5404-7cf8-41de-b29c-866b5083cf60-lj5sr'
                },
                {
                    key: 'jaeger.version',
                    type: 'string',
                    value: 'Node-3.11.0'
                }
            ]
        },
        p5: {
            serviceName: 'api-server',
            tags: [
                {
                    key: 'client-uuid',
                    type: 'string',
                    value: '6fd5988e-68cc-445a-836c-e23acbbda0f9'
                },
                {
                    key: 'ip',
                    type: 'float64',
                    value: 183058482
                },
                {
                    key: 'jaeger.hostname',
                    type: 'string',
                    value: 'api-server-6b4889b85f-hsz6q'
                },
                {
                    key: 'jaeger.version',
                    type: 'string',
                    value: 'Node-3.13.0'
                }
            ]
        }
    },
    duration: 1039000,
    startTime: 1543140789400000,
    endTime: 1543140790439000
}

