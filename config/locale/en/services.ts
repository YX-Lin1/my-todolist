export default {
  title: "Services",
  description:
    "Service-centric business layer: compose data sources via DI with contract-first boundaries.",
  pages: {
    overview: "Overview",
    users: "Users service",
  },
  introduction: {
    title: "Services",
    docCta: "Read full docs →",
    lead: "This pattern helps you build stable, scalable, and testable business code in Surge Next.js Framework.",
    sections: {
      keyPoints: {
        title: "Key points",
        items: {
          servicesIsCore: {
            label: "Services are the business core",
            desc: "Orchestrate use cases and expose stable APIs to upper layers",
          },
          dataSourcesInfra: {
            label: "Data Sources are infrastructure",
            desc: "Integrate with API / DB / third-party / Cache / Queue, and support multiple providers",
          },
          diIsBackbone: {
            label: "DI is the backbone",
            descPrefix:
              "Register services and data sources by namespace so upper layers only depend on",
          },
          contractFirst: {
            label: "Contract-first",
            desc: "Fixed file contracts and naming conventions keep modules consistent, readable, and replaceable",
          },
        },
      },
      layering: {
        title: "Layering & dependency direction (must follow)",
        lead: "Dependencies must go top-down:",
        code: `Server Components / Server Actions / Tests / tRPC / Route Handlers
  -> container.services.getXxxService()
     -> Services (orchestration + contract + mapping)
        -> Data Sources (api/*, db/*, integrations/*, cache/*, ...)`,
      },
      responsibilities: {
        title: "Responsibilities",
        servicesTitle: "Services layer",
        servicesItems: {
          orchestration: {
            label: "Orchestration",
            desc: "Compose multiple data sources for a use case (parallelism, retries, idempotency, fallbacks belong here)",
          },
          contract: {
            label: "Contracts",
            desc: "Define input/output with Zod schemas, unify validation and normalization (e.g. string date -> Date)",
          },
          mapping: {
            label: "Mapping",
            desc: "Map raw data source outputs into stable DTOs for upper layers (use schema.parse to tighten boundaries)",
          },
        },
        dataSourcesTitle: "Data Sources layer",
        dataSourcesItems: {
          singleSourceClosure: {
            label: "Single-source closure",
            desc: "Each data source is self-contained (client factory + registrations + modules such as api/repository)",
          },
          configIsolation: {
            label: "Configuration isolation",
            desc: "Each data source has its own env/config (multiple API base URLs, DB connections, drizzle configs, etc.)",
          },
          replaceable: {
            label: "Replaceable / co-exist",
            desc: "Multiple providers per type (e.g. mainApi / billingApi, mainDb / auditDb)",
          },
        },
      },
      forbidden: {
        title: "What not to do (common architecture breakpoints)",
        items: {
          noDirectInfraFromEntrypoint:
            "Entry points (pages, RSC, actions, tRPC routers) must not access api/* or db/* implementations directly",
          noNewClientInServices:
            "Services must not instantiate http/db clients or read env directly (inject via data sources instead)",
          noCrossDataSource:
            "Data Sources must not call each other (cross-source composition must be lifted to Services)",
        },
      },
      deliverables: {
        title: "What are the deliverables of this pattern?",
        lead: "When implementing a business capability, you should end up with:",
        items: {
          stableEntry:
            "A stable entry point: container.services.getXxxService().method(...)",
          fileContract:
            "A fixed file contract: *-request.types.ts / *-response.types.ts / *-request.schema.ts / *-response.schema.ts / *-mapper.ts / *-impl.ts",
          diRegistrations:
            "Composable DI registrations: each data source and service has its own registrations.ts, aggregated into AppContainer by library/di/registrations.ts",
        },
      },
      whenToAdd: {
        title: "When should you add a new Service?",
        lead: 'Add a service method/class when you need a "stable business capability" for upper layers:',
        items: {
          forRscOrActions:
            "Provide a use-case entry for Server Components / Actions",
          forTrpc:
            "Provide reusable business capabilities for tRPC (used by Client Components / third parties)",
          forTests:
            "Enable easy testing via single-point replacement (override data sources) and boundary assertions",
        },
      },
      tryDemos: {
        title: "Explore the demos",
        description: "Continue with the concrete demo pages:",
      },
    },
  },
  users: {
    title: "Users service",
    lead: "Call UsersService.get via the DI container (same path as tRPC users.get). Requires a reachable API and database for a real user id.",
    formLabel: "User id (numeric string)",
    submit: "Load",
    noIdHint:
      "Enter a valid snowflake-style id and submit. The page will call container.services.getUsersService().get('{ id }').",
    resultTitle: "Response",
    friendly: {
      title: "User profile",
      timeZone: "Displayed in timezone: {timeZone}",
      fullName: "Full name",
      email: "Email",
      id: "User id",
      tags: "Tags",
      bio: "Bio",
      avatarUrl: "Avatar URL",
      createdAt: "Created at",
      updatedAt: "Updated at",
      empty: "N/A",
    },
    errorTitle: "Request failed",
    errorHint:
      "Check API/DB configuration and that the id exists. Validation errors mean the id format is invalid.",
    errorDetailsLabel: "Details",
  },
};
