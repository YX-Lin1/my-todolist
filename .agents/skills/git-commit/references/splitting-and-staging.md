# 拆分提交与暂存策略

## 目标

在看清变更的前提下，将工作区与索引中的改动整理为**一条或多条**具有清晰叙事、可独立 review 的提交；**必要时对同一文件拆分多次提交**。

---

## 先按「语义类型」分组，再落到文件或 hunk

1. 为每个变更推断 Conventional Commits 的 `type`（以及合适的 `scope`）。常见映射：`feat`、`fix`、`perf`、`refactor`、`docs`、`test`、`build`、`ci`、`chore` 等。  
2. **同一 `type`+叙事单元**可合并为一段提交；**不同类型**原则上拆成多段。  
3. **同一文件**若同时包含不同类型改动（例如同一 `Foo.tsx` 既有 `fix` 又有 `feat`），必须拆成**至少两段提交**，除非用户明确接受合并（须在确认门记录用户意见）。

---

## 同文件拆分：推荐做法

Git 以「索引中的变更」为单位提交；要对同一工作区文件分两次提交，需要**分步暂存**。

### 方法 1：交互式暂存（首选）

对目标文件使用 patch 级选择：

```bash
git add -p -- path/to/file
```

按提示挑选进入本段提交的 hunk；完成本段后：

```bash
git diff --cached --stat
git commit -m "type(scope): English subject" -m "- English body line: what this staged chunk does."
```

执行本 Skill 时**禁止**只写 subject：每次 `git commit` 的 message 须含符合 [conventional-commits.md](./conventional-commits.md) 的正文（`- ` 列表）；多条说明可写在同一 `-m` 参数字符串的换行后，或拆成多次 `-m`。

随后对剩余变更继续下一段 `git add -p` 与 `git commit`。

### 方法 2：拆分为补丁文件（适合复杂场景）

在用户同意且环境允许时，可导出部分 diff、拆分编辑后再应用——**高风险**，仅在用户明确要求时使用，并在方案中逐步列出命令与回滚方式。

### 方法 3：用户先在编辑器或 IDE 中手工拆分改动

若 hunk 边界难以通过 `git add -p` 清晰划分，应在确认门建议用户先手工拆分变更或拆文件，再继续；**不得**为省事合并不兼容语义。

---

## 删除与重命名

- **删除**：确保整段提交只包含与删除叙事一致的条目；与其它类型混排时拆段。  
- **重命名**：注意 porcelain 可能显示为删除+添加；方案中应描述为 rename 叙事或按事实分两行处理，避免 message 与事实不符。

---

## 每段提交前的校验

```bash
git diff --cached --name-only
git diff --cached --stat
```

核对与已确认方案一致后再 `git commit`。

---

## 多次提交的顺序

一般建议：

1. 先提交**独立基础设施**（例如仅 `ci`、`build`）若其与功能改动无耦合。  
2. **fix** 与 **feat** 同域耦合时，按用户 review 习惯排列；默认可将 **fix** 前置以便功能提交更干净（非强制，须在方案中说明理由）。
