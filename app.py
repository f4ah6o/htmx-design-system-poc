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


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
