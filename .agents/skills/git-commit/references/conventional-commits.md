# Conventional Commits — 本 Skill 采用的约定

规范原文：<https://www.conventionalcommits.org/>

本仓库内执行本 Skill 时的附加约束：

- **subject 使用英文**；**body 与 footer 使用英文**（含 BREAKING CHANGE 说明）。
- 默认消息结构：

```text
type(ui): align submit button to form grid

- Move the button into the footer row so spacing matches the design spec.

Optional footers after a blank line, e.g. BREAKING CHANGE: English explanation
```

---

## type（常用）

| type | 典型含义 |
|------|----------|
| feat | 新功能 |
| fix | 缺陷修复 |
| perf | 性能优化 |
| refactor | 不改变对外行为的重构 |
| docs | 文档 |
| test | 测试 |
| build | 构建系统或依赖编译相关 |
| ci | CI 配置与脚本 |
| chore | 杂项维护（不污染更精确类型时） |

若团队有更细约定，以用户说明为准并在方案中注明。

---

## scope

- 使用简短英文片段：模块名、子系统名或领域名（如 `auth`、`api`、`ui`）。  
- 若难以选择，可用最贴近变更中心的名词；**避免空泛**的 `misc`。

---

## subject 写作

- 祈使语气、首字母小写（团队若统一大写首字母则整仓一致即可）。  
- 不在 subject 末尾加句号。  
- 长度保持可读；优先清晰而非炫技。

---

## body

**必填。** 写在 subject 与任何 footer 之间，与 subject **空一行**隔开；使用英文。

把本次提交里**需要单独说明的维度**拆开写：动机、具体改动、影响或风险、后续动作等，**能分成几条就写几条**；**每一条占一行，且该行必须以 ASCII 连字符加空格（`- `）开头**。只有一件要说的事时，**仍然只写一行** `- ...`，不得省略 body，也不得改成无前缀的整段散文。

```text
- Explain motivation or context.
- Note impact or follow-up work.
```

`BREAKING CHANGE:` 等 **footer** 仍按 Conventional Commits 放在正文之后、单独成段；**不必**加 `- ` 前缀。

---

## BREAKING CHANGE

破坏性变更须在 body 或 footer 中按规范标明 `BREAKING CHANGE:`，并保持英文说明。
