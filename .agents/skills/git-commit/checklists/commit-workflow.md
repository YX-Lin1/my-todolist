# Git 提交工作流 — 勾选清单

## Step 1：扫描范围 ⛔ BLOCKING

- [ ] 已明确模式：全仓库 / 仅包含路径 / 全仓库或包含路径再应用排除规则（见 `references/scan-scope.md`）
- [ ] 已生成变更清单（路径 + porcelain 状态），且与约定范围一致

## Step 2：分类与可拆分性

- [ ] 已区分添加、修改、删除；对**修改**文件已评估是否存在**不同提交语义**（不同类型）需拆段
- [ ] 若需同文件拆段：已在方案中写明 patch 暂存或等价步骤（见 `references/splitting-and-staging.md`）

## Step 3：方案（设计阶段不执行 commit）

- [ ] 每段均有英文 subject 与英文 body；body 为必填，且每一独立说明占一行、均以 `- ` 起首（仅一条说明时一行即可）；`type`/`scope` 符合 `references/conventional-commits.md`
- [ ] 每段列出路径或 hunk 级操作说明；多段顺序合理

## Step 4：确认门 ⚠️ REQUIRED

- [ ] 已向用户展示完整方案，并记录修订轮次（若有）
- [ ] 已取得用户对**终稿**的明确确认；**未确认则停止**

## Step 5：执行

- [ ] 已严格按终稿执行每段 `git add`（整文件或 patch）→ 校验暂存 → `git commit`
- [ ] 任一段执行前暂存区与终稿一致；中途未静默偏离方案
