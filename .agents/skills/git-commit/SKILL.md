---
name: git-commit
description: Git 提交规划与执行：按扫描范围收集变更、按 Conventional Commits 设计英文 subject 与必填 body（`- ` 列表）、拆成一次或多次提交（含同文件多类型拆分），方案经用户确认后再 git add/commit。触发：提交、commit、拆分提交、暂存、commit message、conventional commits、排除文件夹扫描、按块提交。不含 push、rebase、merge、改写业务需求。
disable-model-invocation: true
---


# Git 提交规划（Conventional Commits）

铁律：**在用户对「最终提交方案」给出明确确认之前，不得执行任何 `git commit`。** 若用户要求调整方案，须修订后重新展示并再次取得确认；禁止假设同意、禁止边执行边改方案不打招呼。

## 能力边界

- **覆盖**：变更发现与收窄、提交拆分设计、英文 message、暂存与 `git commit` 的执行顺序。
- **不覆盖**：实现产品功能、代码风格统一、push、rebase、merge、解决冲突策略（除非用户显式要求且与本流程兼容）。

## 工作流主干

1. **确定扫描范围** — 全仓库、仅包含若干路径，或「全仓库减去排除列表」；产出一份**事实上的**变更清单（路径 + 状态）。细节见 [references/scan-scope.md](./references/scan-scope.md)。
2. **理解与分类** — 区分添加 / 修改 / 删除；对**修改**类文件判断是否存在**不同提交类型**的改动（例如同一文件混有 `feat` 与 `fix`）。若存在，必须在方案中拆成多次提交，并规划**按 hunk / 交互式暂存**（如 `git add -p`）或等价安全流程。见 [references/splitting-and-staging.md](./references/splitting-and-staging.md)。
3. **拟定提交方案** — 每次提交包含：英文 subject、**英文 body（必填，`- ` 列表）**、涉及路径（或 hunk 级说明）、推断的 `type` 与 `scope`。格式见 [references/conventional-commits.md](./references/conventional-commits.md)。
4. **确认门** — 向用户展示完整方案；根据反馈迭代；**仅当用户确认终稿**后进入下一步。
5. **执行** — 严格按终稿顺序：`git add`（整文件或 patch 模式）→ 校验暂存区 → `git commit`；多段提交重复本序列。

复制执行清单：[./checklists/commit-workflow.md](./checklists/commit-workflow.md)。

## 确认门（必须）

每次展示方案须至少包含：

- 扫描模式（全项目 / 包含路径 / 排除规则）与最终纳入的路径列表；
- 拟提交次数及**每一段**的英文 subject 与英文 body（body 规则见 `conventional-commits.md`）；
- 每一段涉及的文件；若某段依赖 patch 暂存，须写清**如何分块**（引用 `splitting-and-staging.md` 中的可复核步骤）。

**未取得用户对终稿的明确确认，禁止 `git commit`。**

## 反模式

- 未确认即 `git commit`，或先提交再「事后解释」。
- 仅按「文件名」机械拆分而忽略**同文件多类型**改动。
- 忽略用户给出的包含 / 排除范围，擅自扩大或缩小扫描面。
- 使用非英文 subject/body（BREAKING CHANGE 等 footer 仍遵循 Conventional Commits 惯例，保持英文）。

## 交付前检查

- [ ] 已勾选 [./checklists/commit-workflow.md](./checklists/commit-workflow.md)。
- [ ] 每一次 `git commit` 均可追溯到用户已确认的方案条目。

## References 索引

| 文档 | 用途 |
|------|------|
| [scan-scope.md](./references/scan-scope.md) | 全项目 / 指定路径 / 排除路径的收集与过滤 |
| [splitting-and-staging.md](./references/splitting-and-staging.md) | 一次或多次提交、同文件拆分、暂存校验 |
| [conventional-commits.md](./references/conventional-commits.md) | 规范摘要与 type/scope/subject/body 约定 |
