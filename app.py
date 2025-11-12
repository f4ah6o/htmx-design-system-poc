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


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
