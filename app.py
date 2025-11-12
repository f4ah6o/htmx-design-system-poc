from flask import Flask, render_template, request

app = Flask(__name__)

# テンプレートフォルダにcomponentsディレクトリを追加
app.jinja_loader.searchpath.append('components')


@app.route('/')
def index():
    """メインページ"""
    return render_template('index.html')


@app.route('/atoms')
def atoms():
    """Atomsコンポーネントカタログ"""
    return render_template('atoms.html')


@app.route('/molecules')
def molecules():
    """Moleculesコンポーネントカタログ"""
    return render_template('molecules.html')


@app.route('/organisms')
def organisms():
    """Organismsコンポーネントカタログ"""
    return render_template('organisms.html')


# htmx デモ用APIエンドポイント
@app.route('/api/demo/message')
def demo_message():
    """デモメッセージを返す"""
    return '<p class="text-green-600 font-semibold">✓ htmxが正常に動作しています！サーバーからメッセージを取得しました。</p>'


@app.route('/api/validate/username', methods=['POST'])
def validate_username():
    """ユーザー名のバリデーション"""
    username = request.form.get('username', '')

    if not username:
        return ''

    if len(username) < 3:
        return '<p class="text-red-600">✗ ユーザー名は3文字以上である必要があります</p>'

    if len(username) > 20:
        return '<p class="text-red-600">✗ ユーザー名は20文字以下である必要があります</p>'

    # 簡易的なチェック: 予約語
    reserved = ['admin', 'root', 'system']
    if username.lower() in reserved:
        return '<p class="text-red-600">✗ このユーザー名は使用できません</p>'

    return '<p class="text-green-600">✓ このユーザー名は使用可能です</p>'


@app.route('/api/demo/submit-form', methods=['POST'])
def demo_submit_form():
    """フォーム送信デモ"""
    name = request.form.get('name', '')
    message = request.form.get('message', '')

    if not name or not message:
        return '<div class="p-4 bg-red-50 rounded-md"><p class="text-red-600">すべてのフィールドを入力してください</p></div>'

    return f'''
    <div class="p-4 bg-green-50 rounded-md">
        <p class="text-green-600 font-semibold mb-2">✓ フォームが正常に送信されました！</p>
        <div class="text-sm text-gray-700 space-y-1">
            <p><strong>名前:</strong> {name}</p>
            <p><strong>メッセージ:</strong> {message}</p>
        </div>
    </div>
    '''


@app.route('/api/demo/product/<product_id>')
def demo_product(product_id):
    """商品詳細デモ"""
    products = {
        'a': {
            'name': '商品 A',
            'price': '¥1,980',
            'description': '高品質な商品Aです。素晴らしい機能を備えています。',
            'stock': '在庫あり',
            'color': 'blue'
        },
        'b': {
            'name': '商品 B',
            'price': '¥2,980',
            'description': 'プレミアム商品Bです。最高の体験を提供します。',
            'stock': '残りわずか',
            'color': 'purple'
        },
        'c': {
            'name': '商品 C',
            'price': '¥980',
            'description': 'お手頃価格の商品Cです。コストパフォーマンスに優れています。',
            'stock': '在庫あり',
            'color': 'green'
        }
    }

    product = products.get(product_id)
    if not product:
        return '<p class="text-red-600">商品が見つかりませんでした</p>'

    color_map = {
        'blue': 'bg-blue-100 text-blue-800',
        'purple': 'bg-purple-100 text-purple-800',
        'green': 'bg-green-100 text-green-800'
    }
    color_class = color_map.get(product['color'], 'bg-gray-100 text-gray-800')

    return f'''
    <div class="space-y-4">
        <h3 class="text-2xl font-bold text-gray-900">{product['name']}</h3>
        <div class="flex items-center gap-4">
            <span class="text-3xl font-bold text-blue-600">{product['price']}</span>
            <span class="px-3 py-1 {color_class} rounded-full text-sm font-medium">{product['stock']}</span>
        </div>
        <p class="text-gray-700">{product['description']}</p>
        <div class="flex gap-3 pt-4">
            <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                カートに追加
            </button>
            <button class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                お気に入り
            </button>
        </div>
    </div>
    '''


@app.route('/api/organisms/modal/<scenario>')
def organisms_modal_content(scenario):
    """Organismsモーダルに差し込む部分テンプレート"""
    modal_content = {
        'overview': {
            'badge': 'ハイライト',
            'title': 'Design System 今週の進捗',
            'description': 'Atoms/Moleculesレイヤーが完成し、Organismsの実装に着手しました。',
            'items': [
                {
                    'label': 'レイアウトテンプレート',
                    'value': '4/5 完了',
                    'note': '基盤となるセクション構造を整備'
                },
                {
                    'label': 'アクセシビリティレビュー',
                    'value': '進行中',
                    'note': 'WAI-ARIA属性の棚卸しを実施'
                },
                {
                    'label': 'Storyサンプル',
                    'value': '8件',
                    'note': 'ユースケースに紐付いたサンプルを追加'
                }
            ]
        },
        'release': {
            'badge': 'Release note',
            'title': 'v0.3.0 リリース候補',
            'description': 'Organismsコンポーネントを含むPoC第3弾を今週リリース予定です。',
            'items': [
                {
                    'label': '新機能',
                    'value': 'モーダル / ナビバー / ステータスパネル',
                    'note': 'htmx属性付きテンプレートを追加'
                },
                {
                    'label': '改善',
                    'value': '読み込みインジケーター',
                    'note': '共通コンポーネント化し、`hx-indicator`で利用可能に'
                },
                {
                    'label': 'デプロイ',
                    'value': '11/15 予定',
                    'note': 'PoC用のプレビュー環境に反映'
                }
            ]
        },
        'feedback': {
            'badge': 'Feedback',
            'title': 'ユースケース検証のお願い',
            'description': 'OrganismsのUI/UXについて、次回レビューまでに確認して欲しい観点をまとめました。',
            'items': [
                {
                    'label': 'レスポンシブ体験',
                    'value': 'ブレークポイント md / lg',
                    'note': 'ナビバーのブレークポイント挙動をチェック'
                },
                {
                    'label': '部分更新',
                    'value': 'hx-swap 動作',
                    'note': 'モーダル内の差し替えが自然か確認'
                },
                {
                    'label': 'アクセシビリティ',
                    'value': 'フォーカストラップ',
                    'note': 'モーダル操作時のキーボード挙動'
                }
            ]
        }
    }

    content = modal_content.get(scenario, modal_content['overview'])

    items_html = ''.join(
        f'''
        <li class="flex items-start gap-4 p-3 rounded-xl border border-gray-100 bg-gray-50">
            <div>
                <p class="text-sm font-semibold text-gray-900">{item['label']}</p>
                <p class="text-xs text-gray-500">{item['note']}</p>
            </div>
            <span class="ml-auto text-sm font-semibold text-blue-600">{item['value']}</span>
        </li>
        '''
        for item in content['items']
    )

    return f'''
    <div class="space-y-4">
        <div class="space-y-1">
            <span class="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {content['badge']}
            </span>
            <h3 class="text-xl font-bold text-gray-900">{content['title']}</h3>
            <p class="text-sm text-gray-600">{content['description']}</p>
        </div>
        <ul class="space-y-3">
            {items_html}
        </ul>
    </div>
    '''


@app.route('/api/organisms/panel/<panel_id>')
def organisms_panel(panel_id):
    """Organismsページのステータスパネル用部分更新"""
    panel_data = {
        'growth': {
            'title': '週次成長サマリー',
            'badge': 'KPI snapshot',
            'description': '直近7日間の主要KPIと改善提案です。',
            'metrics': [
                {'label': 'Signup conversion', 'value': '+12.4%', 'tone': 'text-emerald-600'},
                {'label': 'Active teams', 'value': '+8.1%', 'tone': 'text-emerald-600'},
                {'label': 'Churn', 'value': '-2.3%', 'tone': 'text-emerald-600'}
            ],
            'notes': ['プロダクト内ツアーの改善がCVRを押し上げています。', '次のスプリントでリテンション向けモーダル導線をA/Bテスト予定。']
        },
        'ops': {
            'title': '運用タスクリスト',
            'badge': 'Operations',
            'description': 'リリース前に完了したいアクションアイテム。',
            'metrics': [
                {'label': 'アクセシビリティ監査', 'value': '80% 完了', 'tone': 'text-amber-600'},
                {'label': 'ドキュメント更新', 'value': '5/8 ページ', 'tone': 'text-gray-700'},
                {'label': 'テストシナリオ', 'value': '12 ケース', 'tone': 'text-gray-700'}
            ],
            'notes': ['残タスク: モーダルのフォーカス管理、ナビバーのキーボード操作。', 'Notionで進捗を同期し、レビューコメントを集約。']
        },
        'support': {
            'title': 'サポートインサイト',
            'badge': 'Support',
            'description': '直近の問い合わせ傾向と改善ヒント。',
            'metrics': [
                {'label': 'お問い合わせ件数', 'value': '42 (-6)', 'tone': 'text-emerald-600'},
                {'label': '主要カテゴリ', 'value': 'UIカスタム / API', 'tone': 'text-gray-700'},
                {'label': '平均初回応答', 'value': '1.8h', 'tone': 'text-blue-600'}
            ],
            'notes': ['デザインシステムの使い方ガイドをDocsに追加予定。', '動画チュートリアルの要望が複数寄せられています。']
        }
    }

    content = panel_data.get(panel_id, panel_data['growth'])
    metric_html = ''.join(
        f'''
        <li class="flex items-center justify-between rounded-xl bg-white/70 px-4 py-3">
            <span class="text-sm font-medium text-gray-600">{metric['label']}</span>
            <span class="text-sm font-semibold {metric['tone']}">{metric['value']}</span>
        </li>
        '''
        for metric in content['metrics']
    )

    notes_html = ''.join(
        f'<li class="text-sm text-gray-600 leading-relaxed">{note}</li>'
        for note in content['notes']
    )

    return f'''
    <div class="space-y-5">
        <div class="space-y-1">
            <span class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {content['badge']}
            </span>
            <h3 class="text-2xl font-bold text-gray-900">{content['title']}</h3>
            <p class="text-sm text-gray-600">{content['description']}</p>
        </div>
        <ul class="space-y-2">
            {metric_html}
        </ul>
        <ul class="space-y-2 list-disc list-inside">
            {notes_html}
        </ul>
    </div>
    '''


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
