export default {
  title: "サービス",
  description:
    "Services を業務の中核に据え、DI でデータソースを編成し契約優先で境界を保つパターン。",
  pages: {
    overview: "概要",
    users: "Users サービス",
  },
  introduction: {
    title: "統一サービス（Services）",
    docCta: "ドキュメントを読む →",
    lead: "Surge Next.js Framework で、安定・拡張性・テスト容易性の高い業務コードを構築するためのパターンです。",
    sections: {
      keyPoints: {
        title: "要点",
        items: {
          servicesIsCore: {
            label: "Services は業務の中核",
            desc: "ユースケースを編成し、上位層に安定したインターフェースを提供",
          },
          dataSourcesInfra: {
            label: "Data Sources は基盤",
            desc: "API / DB / 外部サービス / Cache / Queue などに接続し、複数プロバイダを共存可能",
          },
          diIsBackbone: {
            label: "DI は骨格",
            descPrefix:
              "services と data sources を名前空間で登録し、上位層は次のみに依存",
          },
          contractFirst: {
            label: "契約優先",
            desc: "固定のファイル契約と命名規約で、モジュールを一貫性・可読性・置換性のある形に揃える",
          },
        },
      },
      layering: {
        title: "レイヤリングと依存方向（必須）",
        lead: "依存は必ず上位から下位へ：",
        code: `Server Components / Server Actions / Tests / tRPC / Route Handlers
  -> container.services.getXxxService()
     -> Services (orchestration + contract + mapping)
        -> Data Sources (api/*, db/*, integrations/*, cache/*, ...)`,
      },
      responsibilities: {
        title: "責務",
        servicesTitle: "Services 層の責務",
        servicesItems: {
          orchestration: {
            label: "編成",
            desc: "複数のデータソースを組み合わせてユースケースを実現（並列化・リトライ・冪等・フォールバックはここ）",
          },
          contract: {
            label: "契約",
            desc: "Zod schema で入出力を定義し、検証と正規化（例：string の日付 -> Date）を統一",
          },
          mapping: {
            label: "マッピング",
            desc: "データソースの返却を上位層向けの安定 DTO に変換（schema.parse で境界を収束）",
          },
        },
        dataSourcesTitle: "Data Sources 層の責務",
        dataSourcesItems: {
          singleSourceClosure: {
            label: "単一ソースの閉包",
            desc: "各データソースは自己完結（client factory + registrations + modules（api/repository など））",
          },
          configIsolation: {
            label: "設定の分離",
            desc: "データソースごとに env/設定を分離（複数の API baseURL、DB 接続、drizzle config など）",
          },
          replaceable: {
            label: "置換・共存",
            desc: "同種でも複数プロバイダを持てる（例：mainApi / billingApi、mainDb / auditDb）",
          },
        },
      },
      forbidden: {
        title: "禁止事項（設計が崩れる典型）",
        items: {
          noDirectInfraFromEntrypoint:
            "上位の入口（ページ、RSC、actions、tRPC router）は api/* / db/* 実装へ直接アクセスしない",
          noNewClientInServices:
            "Services で http/db client を new しない、env を直接読まない（データソースから注入）",
          noCrossDataSource:
            "Data Sources 同士を呼び合わない（複数ソースの合成は Services に引き上げる）",
        },
      },
      deliverables: {
        title: "このパターンの“成果物”は？",
        lead: "業務機能を実装した結果、次が揃うべきです：",
        items: {
          stableEntry:
            "安定した呼び出し口：container.services.getXxxService().method(...)",
          fileContract:
            "固定のファイル契約：*-request.types.ts / *-response.types.ts / *-request.schema.ts / *-response.schema.ts / *-mapper.ts / *-impl.ts",
          diRegistrations:
            "合成可能な DI 登録：各データソース／サービスに registrations.ts があり、library/di/registrations.ts で AppContainer に集約",
        },
      },
      whenToAdd: {
        title: "いつ Service を追加すべき？",
        lead: "上位層へ提供する“安定した業務能力”が必要になったときに service メソッド／クラスを追加します：",
        items: {
          forRscOrActions:
            "Server Component / Action にユースケースの入口を提供",
          forTrpc:
            "tRPC 向けに再利用可能な業務能力を提供（Client Component / 外部利用）",
          forTests:
            "テストでの単一点差し替え（override data sources）と境界アサーションを可能にする",
        },
      },
      tryDemos: {
        title: "デモを確認する",
        description: "具体的なデモページに進みます:",
      },
    },
  },
  users: {
    title: "Users サービス",
    lead: "DI コンテナ経由で UsersService.get を呼びます（tRPC の users.get と同じ経路）。実在するユーザー id には API と DB への接続が必要です。",
    formLabel: "ユーザー id（数字の文字列）",
    submit: "読み込み",
    noIdHint:
      "有効な snowflake 形式の id を入力して送信してください。container.services.getUsersService().get('{ id }') が呼ばれます。",
    resultTitle: "レスポンス",
    friendly: {
      title: "ユーザープロファイル",
      timeZone: "表示タイムゾーン: {timeZone}",
      fullName: "氏名",
      email: "メールアドレス",
      id: "ユーザー id",
      tags: "タグ",
      bio: "自己紹介",
      avatarUrl: "アバター URL",
      createdAt: "作成日時",
      updatedAt: "更新日時",
      empty: "該当なし",
    },
    errorTitle: "リクエストに失敗しました",
    errorHint:
      "API/DB の設定と id の存在を確認してください。バリデーションエラーは id 形式が不正な場合です。",
    errorDetailsLabel: "詳細",
  },
};
