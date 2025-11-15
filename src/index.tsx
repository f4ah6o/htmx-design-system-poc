import { Hono } from "hono";
import { html } from "hono/html";
import {
	CATALOG_COMPONENTS,
	findTask,
	STATUS_META,
	type Task,
	USE_CASE_TASKS,
} from "./data";
import { IndexPage, Layout, renderTaskPanel } from "./templates";

const app = new Hono();

// ホームページ
app.get("/", (c) => {
	return c.html(IndexPage());
});

// 基本的なページルート
app.get("/atoms", (c) => {
	return c.html(
		<Layout title="Atoms - htmx Design System">
			<div class="max-w-6xl mx-auto px-4 py-12">
				<h1 class="text-4xl font-bold mb-8">Atoms</h1>
				<p class="text-gray-600 mb-8">基本的な構成要素</p>
				<div class="space-y-6">
					{CATALOG_COMPONENTS.filter((c) => c.category === "Atoms").map(
						(comp) => (
							<div class="p-6 bg-white rounded-lg shadow-sm">
								<h2 class="text-xl font-semibold mb-2">{comp.title}</h2>
								<p class="text-gray-600">{comp.summary}</p>
							</div>
						),
					)}
				</div>
			</div>
		</Layout>,
	);
});

app.get("/molecules", (c) => {
	return c.html(
		<Layout title="Molecules - htmx Design System">
			<div class="max-w-6xl mx-auto px-4 py-12">
				<h1 class="text-4xl font-bold mb-8">Molecules</h1>
				<p class="text-gray-600 mb-8">シンプルなコンポーネントグループ</p>
				<div class="space-y-6">
					{CATALOG_COMPONENTS.filter((c) => c.category === "Molecules").map(
						(comp) => (
							<div class="p-6 bg-white rounded-lg shadow-sm">
								<h2 class="text-xl font-semibold mb-2">{comp.title}</h2>
								<p class="text-gray-600">{comp.summary}</p>
							</div>
						),
					)}
				</div>
			</div>
		</Layout>,
	);
});

app.get("/organisms", (c) => {
	return c.html(
		<Layout title="Organisms - htmx Design System">
			<div class="max-w-6xl mx-auto px-4 py-12">
				<h1 class="text-4xl font-bold mb-8">Organisms</h1>
				<p class="text-gray-600 mb-8">複雑なUIセクション</p>
				<div class="space-y-6">
					{CATALOG_COMPONENTS.filter((c) => c.category === "Organisms").map(
						(comp) => (
							<div class="p-6 bg-white rounded-lg shadow-sm">
								<h2 class="text-xl font-semibold mb-2">{comp.title}</h2>
								<p class="text-gray-600">{comp.summary}</p>
							</div>
						),
					)}
				</div>
			</div>
		</Layout>,
	);
});

app.get("/catalog", (c) => {
	const _defaultSlug = CATALOG_COMPONENTS[0]?.slug || "";
	return c.html(
		<Layout title="Component Catalog">
			<div class="max-w-7xl mx-auto px-4 py-8">
				<h1 class="text-4xl font-bold mb-8">Component Catalog</h1>
				<div class="grid md:grid-cols-3 gap-6">
					<div class="space-y-2">
						{CATALOG_COMPONENTS.map((comp) => (
							<button
								hx-get={`/api/catalog/${comp.slug}`}
								hx-target="#catalog-detail"
								hx-swap="innerHTML"
								class="w-full text-left p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200"
							>
								<div class="text-xs text-gray-500 mb-1">{comp.category}</div>
								<div class="font-semibold">{comp.title}</div>
								<div class="text-sm text-gray-600 mt-1">{comp.summary}</div>
							</button>
						))}
					</div>
					<div class="md:col-span-2">
						<div
							id="catalog-detail"
							class="p-8 bg-white rounded-lg shadow-sm border border-gray-200"
						>
							<p class="text-gray-500">コンポーネントを選択してください</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>,
	);
});

app.get("/use-cases", (c) => {
	return c.html(
		<Layout title="Use Cases">
			<div class="max-w-6xl mx-auto px-4 py-8">
				<h1 class="text-4xl font-bold mb-8">Use Cases</h1>

				<div class="mb-8 p-6 bg-white rounded-lg shadow-sm">
					<h2 class="text-xl font-semibold mb-4">新しいタスクを追加</h2>
					<form
						hx-post="/api/use-cases/tasks"
						hx-target="#task-panel"
						hx-swap="outerHTML"
					>
						<div class="space-y-4">
							<input
								type="text"
								name="title"
								placeholder="タスク名"
								class="w-full px-4 py-2 border rounded-lg"
								required
							/>
							<input
								type="text"
								name="owner"
								placeholder="担当者"
								class="w-full px-4 py-2 border rounded-lg"
							/>
							<input
								type="text"
								name="summary"
								placeholder="概要"
								class="w-full px-4 py-2 border rounded-lg"
							/>
							<select name="status" class="w-full px-4 py-2 border rounded-lg">
								<option value="planning">計画中</option>
								<option value="in-progress">進行中</option>
								<option value="review">レビュー待ち</option>
								<option value="done">完了</option>
							</select>
							<button
								type="submit"
								class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
							>
								追加
							</button>
						</div>
					</form>
				</div>

				{html`${renderTaskPanel(undefined, "info", USE_CASE_TASKS, STATUS_META)}`}
			</div>
		</Layout>,
	);
});

// ===== API エンドポイント =====

app.get("/api/demo/message", (c) => {
	return c.html(
		'<p class="text-green-600 font-semibold">✓ htmxが正常に動作しています！サーバーからメッセージを取得しました。</p>',
	);
});

app.post("/api/validate/username", async (c) => {
	const formData = await c.req.formData();
	const username = formData.get("username")?.toString() || "";

	if (!username) {
		return c.html("");
	}

	if (username.length < 3) {
		return c.html(
			'<p class="text-red-600">✗ ユーザー名は3文字以上である必要があります</p>',
		);
	}

	if (username.length > 20) {
		return c.html(
			'<p class="text-red-600">✗ ユーザー名は20文字以下である必要があります</p>',
		);
	}

	const reserved = ["admin", "root", "system"];
	if (reserved.includes(username.toLowerCase())) {
		return c.html(
			'<p class="text-red-600">✗ このユーザー名は使用できません</p>',
		);
	}

	return c.html('<p class="text-green-600">✓ このユーザー名は使用可能です</p>');
});

app.post("/api/demo/submit-form", async (c) => {
	const formData = await c.req.formData();
	const name = formData.get("name")?.toString() || "";
	const message = formData.get("message")?.toString() || "";

	if (!name || !message) {
		return c.html(
			'<div class="p-4 bg-red-50 rounded-md"><p class="text-red-600">すべてのフィールドを入力してください</p></div>',
		);
	}

	return c.html(html`
    <div class="p-4 bg-green-50 rounded-md">
      <p class="text-green-600 font-semibold mb-2">✓ フォームが正常に送信されました！</p>
      <div class="text-sm text-gray-700 space-y-1">
        <p><strong>名前:</strong> ${name}</p>
        <p><strong>メッセージ:</strong> ${message}</p>
      </div>
    </div>
  `);
});

app.get("/api/demo/product/:product_id", (c) => {
	const productId = c.req.param("product_id");

	const products: Record<string, any> = {
		a: {
			name: "商品 A",
			price: "¥1,980",
			description: "高品質な商品Aです。素晴らしい機能を備えています。",
			stock: "在庫あり",
			color: "blue",
		},
		b: {
			name: "商品 B",
			price: "¥2,980",
			description: "プレミアム商品Bです。最高の体験を提供します。",
			stock: "残りわずか",
			color: "purple",
		},
		c: {
			name: "商品 C",
			price: "¥980",
			description:
				"お手頃価格の商品Cです。コストパフォーマンスに優れています。",
			stock: "在庫あり",
			color: "green",
		},
	};

	const product = products[productId];
	if (!product) {
		return c.html('<p class="text-red-600">商品が見つかりませんでした</p>');
	}

	const colorMap: Record<string, string> = {
		blue: "bg-blue-100 text-blue-800",
		purple: "bg-purple-100 text-purple-800",
		green: "bg-green-100 text-green-800",
	};
	const colorClass = colorMap[product.color] || "bg-gray-100 text-gray-800";

	return c.html(html`
    <div class="space-y-4">
      <h3 class="text-2xl font-bold text-gray-900">${product.name}</h3>
      <div class="flex items-center gap-4">
        <span class="text-3xl font-bold text-blue-600">${product.price}</span>
        <span class="px-3 py-1 ${colorClass} rounded-full text-sm font-medium">${product.stock}</span>
      </div>
      <p class="text-gray-700">${product.description}</p>
      <div class="flex gap-3 pt-4">
        <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          カートに追加
        </button>
        <button class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
          お気に入り
        </button>
      </div>
    </div>
  `);
});

app.get("/api/catalog/:component_slug", (c) => {
	const slug = c.req.param("component_slug");
	const component = CATALOG_COMPONENTS.find((comp) => comp.slug === slug);

	if (!component) {
		return c.html(
			'<div class="p-6 text-red-600">コンポーネントが見つかりません</div>',
			404,
		);
	}

	return c.html(html`
    <div class="space-y-6">
      <div>
        <div class="text-sm text-gray-500 mb-1">{component.category}</div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">${component.title}</h2>
        <p class="text-gray-600">${component.summary}</p>
      </div>

      <div class="p-6 bg-gray-50 rounded-lg">
        <h3 class="font-semibold mb-4">プレビュー</h3>
        <div class="bg-white p-6 rounded border">
          <p class="text-gray-500">コンポーネントのプレビューがここに表示されます</p>
        </div>
      </div>

      <div>
        <h3 class="font-semibold mb-2">コード例</h3>
        <pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
&lt;!-- ${component.title} コンポーネント --&gt;
&lt;div class="component"&gt;
  サンプルコード
&lt;/div&gt;</pre>
      </div>
    </div>
  `);
});

app.post("/api/use-cases/tasks", async (c) => {
	const formData = await c.req.formData();
	const title = formData.get("title")?.toString().trim() || "";
	const owner = formData.get("owner")?.toString().trim() || "Team";
	const statusKey = formData.get("status")?.toString() || "planning";
	const summary =
		formData.get("summary")?.toString().trim() || "詳細は後で追記します";

	if (!title) {
		return c.html(
			renderTaskPanel(
				"タスク名を入力してください",
				"error",
				USE_CASE_TASKS,
				STATUS_META,
			),
			400,
		);
	}

	const newTask: Task = {
		id: `task-${Math.random().toString(36).substr(2, 6)}`,
		title,
		owner,
		status: (statusKey in STATUS_META ? statusKey : "planning") as any,
		summary,
		details: summary,
	};

	USE_CASE_TASKS.unshift(newTask);
	return c.html(
		renderTaskPanel(
			"新しいタスクを追加しました",
			"success",
			USE_CASE_TASKS,
			STATUS_META,
		),
	);
});

app.delete("/api/use-cases/tasks/:task_id", (c) => {
	const taskId = c.req.param("task_id");
	const task = findTask(taskId);

	if (!task) {
		return c.html(
			renderTaskPanel(
				"指定したタスクが見つかりません",
				"error",
				USE_CASE_TASKS,
				STATUS_META,
			),
			404,
		);
	}

	const index = USE_CASE_TASKS.findIndex((t) => t.id === taskId);
	if (index > -1) {
		USE_CASE_TASKS.splice(index, 1);
	}

	return c.html(
		renderTaskPanel(
			"タスクを削除しました",
			"info",
			USE_CASE_TASKS,
			STATUS_META,
		),
	);
});

app.get("/api/use-cases/tasks/:task_id/detail", (c) => {
	const taskId = c.req.param("task_id");
	const task = findTask(taskId);

	if (!task) {
		return c.html(
			'<div class="text-red-600">タスクが見つかりません</div>',
			404,
		);
	}

	const statusInfo = STATUS_META[task.status];
	return c.html(html`
    <div class="space-y-4">
      <h3 class="text-2xl font-bold">${task.title}</h3>
      <div class="flex gap-3">
        <span class="px-3 py-1 rounded ${statusInfo.badge_class}">${statusInfo.label}</span>
        <span class="text-gray-600">担当: ${task.owner}</span>
      </div>
      <p class="text-gray-700">${task.details}</p>
    </div>
  `);
});

app.post("/api/use-cases/feedback", async (c) => {
	const formData = await c.req.formData();
	const name = formData.get("name")?.toString().trim() || "";
	const email = formData.get("email")?.toString().trim() || "";
	const message = formData.get("message")?.toString().trim() || "";

	if (!name || !email || !message) {
		return c.html(
			html`
      <div class="p-4 bg-red-50 rounded-lg border border-red-200">
        <h4 class="font-semibold text-red-900">入力エラー</h4>
        <p class="text-red-700">すべてのフィールドを入力してください。</p>
      </div>
    `,
			400,
		);
	}

	if (!email.includes("@")) {
		return c.html(
			html`
      <div class="p-4 bg-red-50 rounded-lg border border-red-200">
        <h4 class="font-semibold text-red-900">メールアドレスが不正です</h4>
        <p class="text-red-700">有効なメール形式で入力してください。</p>
      </div>
    `,
			400,
		);
	}

	if (message.length < 10) {
		return c.html(
			html`
      <div class="p-4 bg-red-50 rounded-lg border border-red-200">
        <h4 class="font-semibold text-red-900">メッセージが短すぎます</h4>
        <p class="text-red-700">詳細なフィードバックを10文字以上で入力してください。</p>
      </div>
    `,
			422,
		);
	}

	return c.html(html`
    <div class="p-4 bg-green-50 rounded-lg border border-green-200">
      <h4 class="font-semibold text-green-900">送信が完了しました</h4>
      <p class="text-green-700">${name} さん、フィードバックありがとうございます。</p>
    </div>
  `);
});

app.get("/api/use-cases/error-demo", (c) => {
	const mode = c.req.query("mode") || "success";

	if (mode === "server-error") {
		return c.html(
			html`
      <div class="p-4 bg-red-50 rounded-lg border border-red-200">
        <h4 class="font-semibold text-red-900">500エラーを捕捉しました</h4>
        <p class="text-red-700">APIからエラーレスポンスが返ってきた場合もコンポーネント内でメッセージを表示できます。</p>
      </div>
    `,
			500,
		);
	}

	if (mode === "timeout") {
		return c.html(
			html`
      <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 class="font-semibold text-yellow-900">タイムアウトを想定</h4>
        <p class="text-yellow-700">リトライやフォールバックUIをここに表示します。</p>
      </div>
    `,
			504,
		);
	}

	return c.html(html`
    <div class="p-4 bg-green-50 rounded-lg border border-green-200">
      <h4 class="font-semibold text-green-900">正常レスポンス</h4>
      <p class="text-green-700">APIレスポンスが200の場合は通常の成功メッセージを表示します。</p>
    </div>
  `);
});

export default app;
