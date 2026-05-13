# Git 提交工具

## 概述

Git 提交工具可以帮助开发者设计当前分支的提交方案，确保提交信息的规范性和可追溯性。

## 参数说明

- 目录和文件：扫描指定的目录和文件（可以是多个），以整理 git 提交方案。如果没有输入该参数，说明扫描整个项目

## 执行流程

### 总体说明

1. **AI 扫描文件状态** - 检查工作区、指定目录或指定文件的修改情况
2. **AI 设计提交方案** - 根据文件类型和作用域设计详细的提交方案
3. **开发者确认方案** ⚠️ **必须步骤** - 开发者确认或修正提交方案
4. **AI 执行 git 提交** - 严格按照确认的方案执行 git 操作

### 第 1 步：扫描文件状态

AI 必须检查所有相关文件的状态：

```bash
# 检查整个工作区状态
git status --porcelain

# 检查特定目录状态
git status --porcelain <directory>

# 检查特定文件状态
git status --porcelain <file1> <file2> ...

# 检查多个目录和文件的状态
git status --porcelain <directory1> <file1> <directory2> <file2> ...
```

### 第 2 步：设计提交方案

AI 根据第 1 步扫描的文件状态，设计详细的提交方案（此步骤不执行命令，只设计方案）：

#### 2.1 分析文件状态

识别并分类需要提交的文件：

- **未跟踪文件 (??)** - 新增的文件，需要使用 `git add` 添加
- **已修改文件 (M)** - 修改的文件，需要使用 `git add` 添加
- **已删除文件 (D)** - 删除的文件，需要使用 `git add` 或 `git rm` 处理
- **已暂存文件 (A)** - 已在暂存区的文件，可以直接提交

#### 2.2 规划提交分组

根据文件的类型和作用域，决定提交策略：

- **单次提交** - 如果所有文件属于同一类型和作用域，设计为一次提交
- **多次提交** - 如果文件属于不同类型或作用域，根据"多文件修改处理策略"章节的"分离原则"，将文件分成多个组，每组一次提交

#### 2.3 设计提交信息

根据"提交信息规范"和"提交信息模板"章节的要求，为每次提交设计合适的提交信息：

- 确定提交类型 (type)：feat、fix、docs、refactor 等
- 确定作用域 (scope)：ui、auth、services-api 等
- 编写描述 (description)：简洁明了的英文描述
- 如需要，编写详细说明 (body)

#### 2.4 规划执行步骤

为每次提交规划具体的执行命令（在第 4 步执行）：

```bash
# 示例：单次提交的执行步骤
git add <file1> <file2> ...
git diff --cached --name-only  # 验证暂存区
git commit -m "<commit-message>"
```

如果是多次提交，为每次提交规划类似的执行步骤。

### 第 3 步：开发者确认方案

⚠️ **必须步骤**：AI 向开发者展示设计的提交方案，包括：

- 将要提交的文件列表
- 提交信息（包括 type、scope、description）
- 是否需要分多次提交（如有多个提交，说明每次提交的文件和信息）

**开发者必须确认或修正方案后，AI 才能进入下一步。**

### 第 4 步：执行 Git 提交

AI 严格按照开发者确认的方案执行提交：

```bash
# 使用设计的提交信息进行提交
git commit -m "<commit-message>"
```

如果是多次提交，按顺序依次执行每个提交。

## 提交信息规范

### 基本格式

遵循 Conventional Commits 规范，并且使用英文编写

```
<type>(<scope>): <description>

[optional body]
```

### 类型 (Type) 规范

#### 功能相关

- **feat**：新功能
- **fix**：修复 bug
- **perf**：性能优化
- **refactor**：代码重构（不改变功能）
- **style**：代码格式调整（不影响功能）

#### 文档相关

- **docs**：文档更新

#### 构建相关

- **chore**：构建过程或辅助工具的变动
- **deps**：依赖包更新

#### 配置相关

- **config**：配置文件修改

#### 测试相关

- **test**：测试相关修改
- **ci**：CI/CD 相关修改

### 作用域 (Scope) 规范

#### 前端相关

- **ui**：用户界面组件
- **theme**：主题样式
- **i18n**：国际化
- **auth**：认证相关
- **services-api**：API 接口请求服务

#### 后端相关

- **service**：服务层
- **model**：数据模型
- **controller**：控制器
- **middleware**：中间件

#### 配置相关

- **env**：环境配置
- **build**：构建配置
- **deploy**：部署配置

#### 开发工具相关

- **cursor**：Cursor 编辑器相关配置和命令
- **claude**：Claude Code 相关配置和命令

#### 作用域选择原则

当遇到上述规范中没有涵盖的作用域时，请遵循以下原则：

1. **优先使用现有规范** - 尽量从上述列表中选择最接近的作用域
2. **使用模块名称** - 如果修改涉及特定模块，可以使用模块名称作为作用域
3. **使用功能名称** - 如果修改涉及特定功能，可以使用功能名称作为作用域
4. **保持简洁** - 作用域应该简洁明了，通常使用小写字母和连字符
5. **保持一致性** - 在同一个项目中，相同类型的修改应该使用相同的作用域

### 描述 (Description) 规范

#### 基本要求

- 使用英文描述
- 简洁明了，不超过 50 个字符
- 使用动词开头
- 避免使用句号结尾

#### 描述示例

- ✅ `feat(ui): add user avatar upload feature`
- ✅ `fix(auth): fix login session expiration issue`
- ❌ `feat: add feature` (too simple)
- ❌ `fix: fix a bug` (not specific)

## 提交信息模板

### 1. 功能开发

#### 新功能开发

```
feat(scope): feature description

- implement specific feature point 1
- implement specific feature point 2
- add related test cases
```

#### 功能优化

```
perf(scope): performance optimization description

- optimize specific performance point 1
- reduce memory usage
- improve response speed
```

### 2. 问题修复

#### Bug 修复

```
fix(scope): bug fix description

- fix specific issue 1
- add error handling
- update related tests
```

#### 安全修复

```
fix(security): security fix description

- fix security vulnerability
- strengthen input validation
- update security policies
```

### 3. 代码重构

#### 代码重构

```
refactor(scope): refactoring description

- refactor specific module 1
- extract common methods
- optimize code structure
- maintain functionality
```

#### 架构调整

```
refactor(arch): architecture adjustment description

- adjust module structure
- optimize dependencies
- improve code reusability
```

### 4. 文档更新

#### 技术文档

```
docs(scope): documentation update description

- update API documentation
- add usage examples
- correct error information
```

#### 项目文档

```
docs(project): project documentation update

- update README
- add deployment guide
- improve development standards
```

### 5. 配置修改

#### 环境配置

```
config(env): environment configuration update

- update environment variables
- adjust configuration parameters
- add new configuration items
```

#### 构建配置

```
config(build): build configuration update

- update build scripts
- optimize packaging configuration
- add new build options
```

### 6. 依赖更新

#### 依赖升级

```
deps: dependency package update

- upgrade package-name to version
- fix security vulnerabilities
- improve performance
```

#### 依赖添加

```
deps: add new dependency

- add package-name@version
- implement specific functionality
- update related configuration
```

## 多文件修改处理策略

当存在多个不同类型或作用域的文件修改时，应遵循"操作顺序"的通用流程，重点关注如何分组和分离提交。

### 分离原则

1. **按类型分离** - 不同类型的修改分开提交
   - 功能代码修改：`feat(ui): add new component`
   - 配置修改：`config(build): update webpack configuration`

2. **按作用域分离** - 不同作用域的修改分开提交
   - 前端修改：`feat(ui): add user interface`
   - 前端修改：`feat(services-api): add user service`
   - 数据库修改：`feat(model): add user table`

3. **按功能分离** - 不同功能的修改分开提交
   - 用户认证：`feat(auth): add login functionality`
   - 用户管理：`feat(user): add user profile management`

### 分组提交操作要点

当需要分多次提交时，遵循"操作顺序"的流程，但需要注意以下要点：

1. **分组规划** - 在第 2 步（设计提交方案）时，根据"分离原则"将文件分成多个组
2. **分批暂存** - 每次只暂存一组文件到暂存区
3. **逐组提交** - 完成一组提交后，再处理下一组

#### 具体操作示例

```bash
# 第一组：UI 相关文件
git add src/app/components/UserProfile.tsx src/app/styles/profile.css
git diff --cached --name-only  # 验证
git commit -m "feat(ui): add user profile component"

# 第二组：API 相关文件
git add src/services/userService.ts
git diff --cached --name-only  # 验证
git commit -m "feat(services-api): add user profile API endpoints"

# 第三组：文档文件
git add docs/user-profile.md
git diff --cached --name-only  # 验证
git commit -m "docs(user): update user profile documentation"
```

**注意**：每组提交都需要经过第 3 步的开发者确认。

### 示例场景

**场景 1**：全项目扫描 - 同时修改了用户界面、API 服务和文档

**扫描范围**：整个项目

**提交方案**：

```
# 第一次提交
feat(ui): add user profile component
- add UserProfile.tsx component
- add user profile styles
- add user profile tests

# 第二次提交
feat(services-api): add user profile API endpoints
- add getUserProfile endpoint
- add updateUserProfile endpoint
- add user profile validation

# 第三次提交
docs(user): update user profile documentation
- update API documentation
- add component usage examples
- update user guide
```

**场景 2**：指定目录扫描 - 只关注前端修改

**扫描范围**：`src/app/` 目录

**提交方案**：

```
# 单次提交
feat(ui): add user profile component
- add UserProfile.tsx component
- add user profile styles
- add user profile tests
```

**场景 3**：多目录扫描 - 前后端联调修改

**扫描范围**：`src/app/` + `src/services/` 目录

**提交方案**：

```
# 第一次提交
feat(ui): add user profile component
- add UserProfile.tsx component
- add user profile styles

# 第二次提交
feat(services-api): add user profile API endpoints
- add getUserProfile endpoint
- add updateUserProfile endpoint
```

## 更新日志

你（AI）只有在修改本文件的`更新日志`章节的内容时才需要阅读本章节。

### 20251030

- 优化文档标题，将"Git 提交方案"改为"Git 提交工具"并增加概述章节
- 新增"参数说明"章节，明确目录和文件参数的使用
- 删除"总体说明"章节中的详细配置项，简化文档结构
- 重组"执行流程"章节，增加"总体说明"子章节并规范步骤编号格式
- 优化第 1 步内容，增加检查特定文件和多个目录文件的命令示例
- 重构第 2 步内容，增加详细子步骤（2.1-2.4）并删除独立的"文件状态处理"和"暂存区验证"章节
- 规范化标点符号，统一使用中文冒号格式
- 重命名"提交策略"章节为"提交信息模板"，简化子章节标题
- 删除"扫描范围选择策略"整个章节，简化文档内容
- 删除"提交频率策略（快速参考）"章节
- 优化"多文件修改处理策略"章节，增加"分组提交操作要点"说明
- 统一术语使用，将"文件夹"改为"目录"

### 20251010

- 新增"执行流程"章节，明确 AI 和开发者的职责分工
- 在"完整提交流程"中添加重要提醒，强调开发者确认步骤
- 优化各步骤的描述，明确 AI 的执行职责
- 删除"提交后验证"步骤，简化提交流程
- 删除详细的"提交频率策略"章节，简化为"快速参考"
- 优化"多文件修改处理策略"中的操作步骤描述
- 删除"详细操作步骤"中的重复命令和"最终验证"步骤

### 20251009

- 在文档开头添加重要提醒，强调方案需要开发者确认后再提交

### 20250930

- 初版发布
