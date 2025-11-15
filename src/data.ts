// カタログコンポーネントのメタデータ
export const CATALOG_COMPONENTS = [
	{
		slug: "atoms-button",
		title: "Button",
		category: "Atoms",
		summary: "Tailwindとhtmx向けの汎用ボタン",
		template: "catalog/components/atoms-button.html",
	},
	{
		slug: "atoms-input",
		title: "Input",
		category: "Atoms",
		summary: "バリデーションやhtmxイベント対応の入力欄",
		template: "catalog/components/atoms-input.html",
	},
	{
		slug: "atoms-label",
		title: "Label",
		category: "Atoms",
		summary: "必須マークにも対応したテキストラベル",
		template: "catalog/components/atoms-label.html",
	},
	{
		slug: "atoms-text",
		title: "Text",
		category: "Atoms",
		summary: "バリエーション豊富なテキストスタイル",
		template: "catalog/components/atoms-text.html",
	},
	{
		slug: "molecules-form-group",
		title: "Form Group",
		category: "Molecules",
		summary: "ラベル+入力+ヘルプ/エラーをまとめたフォームブロック",
		template: "catalog/components/molecules-form-group.html",
	},
	{
		slug: "molecules-card",
		title: "Card",
		category: "Molecules",
		summary: "画像やアクションを含む情報カード",
		template: "catalog/components/molecules-card.html",
	},
	{
		slug: "organisms-navbar",
		title: "Navbar",
		category: "Organisms",
		summary: "レスポンシブナビゲーションバー",
		template: "catalog/components/organisms-navbar.html",
	},
	{
		slug: "organisms-modal",
		title: "Modal",
		category: "Organisms",
		summary: "htmxでコンテンツを差し替えるモーダル",
		template: "catalog/components/organisms-modal.html",
	},
	{
		slug: "organisms-loading-indicator",
		title: "Loading Indicator",
		category: "Organisms",
		summary: "hx-indicator向けローディング表示",
		template: "catalog/components/organisms-loading-indicator.html",
	},
];

export const CATALOG_TEMPLATE_MAP = Object.fromEntries(
	CATALOG_COMPONENTS.map((c) => [c.slug, c.template]),
);

// ステータスメタデータ
export const STATUS_META = {
	planning: {
		label: "計画中",
		badge_class: "bg-slate-100 text-slate-700",
	},
	"in-progress": {
		label: "進行中",
		badge_class: "bg-blue-100 text-blue-700",
	},
	review: {
		label: "レビュー待ち",
		badge_class: "bg-amber-100 text-amber-700",
	},
	done: {
		label: "完了",
		badge_class: "bg-emerald-100 text-emerald-700",
	},
} as const;

export type TaskStatus = keyof typeof STATUS_META;

export interface Task {
	id: string;
	title: string;
	owner: string;
	status: TaskStatus;
	summary: string;
	details: string;
}

// ユースケースのタスクデータ（インメモリストレージ）
export const USE_CASE_TASKS: Task[] = [
	{
		id: "task-roadmap",
		title: "Design System ロードマップアップデート",
		owner: "プロダクト",
		status: "planning",
		summary: "次期リリース向けの優先順位付けを整理",
		details: "Atoms/Moleculesの改善要望を集約し、優先順位をつける。",
	},
	{
		id: "task-accessibility",
		title: "アクセシビリティ監査",
		owner: "QA",
		status: "in-progress",
		summary: "モーダル/フォームのWAI-ARIA属性レビュー",
		details: "フォームエラーパターンとモーダルのフォーカストラップを確認。",
	},
	{
		id: "task-docs",
		title: "カタログドキュメント更新",
		owner: "DesignOps",
		status: "review",
		summary: "Storyサンプルと実装解説を追記",
		details: "Atoms/Organismsのサンプルコードをドキュメント化。",
	},
];

export function findTask(taskId: string): Task | undefined {
	return USE_CASE_TASKS.find((task) => task.id === taskId);
}
