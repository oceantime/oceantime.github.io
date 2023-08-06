---
> **ARTS-week-21**
> 2021-05-30 21:18
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

有效的括号：https://leetcode-cn.com/submissions/detail/182263904/
丢失的数字：https://leetcode-cn.com/submissions/detail/182262146/

### 2.Review:

https://martinheinz.dev/blog/28
SQLAlchemy 高级功能

#### 点评：

如果是 Python 开发人员并且使用 SQL 数据库，那么 SQLAlchemy 很可能是熟悉的库。它是强大而灵活的工具包，用于在 Python 中使用具有许多功能的 SQL。其中一些功能（如 ORM 和基本查询）是常识，但有很多功能可能不知道并且绝对应该利用。因此，让我们看看如何利用混合属性、嵌套查询、表元数据、方言等！。

- 实际上有四类内存问题具有相似和重叠的特征，但原因和解决方案各不相同：
  - Performance (性能):通常与过多的对象创建和删除，垃圾收集的长时间延迟，过多的操作系统页面交换等相关联。
  - Resource constraints (资源约束)：当可用内存很少或内存过于分散而无法分配大对象时 - 这可能是本机的，或者更常见的是与 Java  堆相关。
  - Java heap leaks (java 堆泄漏):经典的内存泄漏，Java 对象在不释放的情况下不断创建。这通常是由潜在对象引用引起的。
  - Native memory leaks (本机内存泄漏):与 Java 堆之外的任何不断增长的内存利用率相关联，例如由 JNI 代码，驱动程序甚至 JVM 分配。


1. 列属性
- 基于其他列创建映射属性是很普遍的-本质上是创建计算列。

```python
class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    firstname = Column(String(50))
    lastname = Column(String(50))
    fullname = column_property(firstname + " " + lastname)
```

- 使用 SQL 表达式来创建这样的属性时它会更有用。

```python
class CreditCard(Base):
    __tablename__ = 'card'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=True)


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    firstname = Column(String(50))
    lastname = Column(String(50))
    fullname = column_property(firstname + " " + lastname)
    credit_card = relationship(CreditCard, backref='report')
    has_credit_card = column_property(
        exists().where(CreditCard.user_id == id)
    )

john = User(id=1, firstname='John', lastname='Doe')
session.add(john)
session.commit()
print(john.has_credit_card)
# False
johns_card = CreditCard(user_id=1)
session.add(johns_card)
session.commit()
print(john.has_credit_card)
# True
```

2. 混合属性
- 在产生计算属性的意义上，它们类似于列属性。然而，混合属性从实例级别的 Python 表达式和类级别的 SQL 表达式生成值。

```python
class Order(Base):
    __tablename__ = 'order'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    state = Column(String(20))  # Pending/Complete


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    orders = relationship("Order")
    name = Column(String(50))

    @hybrid_property
    def has_pending_orders(self):
        return any(order.state == "Pending" for order in self.orders)  # -> produces value

    @has_pending_orders.expression
    def has_pending_orders(cls):
        return (
            select([
                case([(exists().where(and_(
                    Order.user_id == cls.id,
                    Order.state == "Pending", )).correlate(cls), True)], else_=False,
                ).label("has_pending_order")
            ]).label("number_of_pending_orders")
        )  # -> produces SQL expression

user = User(
    name="John",
    orders=[
        Order(state="Complete"),
        Order(state="Pending"),
    ]
)

print(user.has_pending_orders)  # evaluate as Python expression
# True
user = session.query(User).filter(User.has_pending_orders).scalar()  # evaluate as SQL expression (Filter)
# SELECT * FROM user
# WHERE (
#   SELECT CASE WHEN (EXISTS (
#       SELECT *
#       FROM order
#       WHERE order.user_id = user.id AND order.state = 'Pending'
#   )) THEN 1 ELSE 0 END AS has_pending_order)

```
- 为了展示 的功能hybrid_property，我们实现了User和之间的简单关系Order，其中每个用户都有订单列表，.state在这种情况下，要么是Pending要么是Complete。现在，如果我们想知道用户是否有任何Pending订单，我们需要考虑两种情况 - 如果我们正在处理已经加载到 Python 对象中的行，那么我们可以只使用 Python 表达式并生成 Python 值 ( has_pending_orders(self)) . 另一方面，如果我们直接从数据库查询这些信息，我们不能使用 Python 表达式，因为数据库引擎不会理解它。因此，对于这种情况 ( has_pending_orders(cls))，我们编写了可以针对数据库运行的 SQL 表达式。
- 附带说明 - 如果的表达式对于 Python 和 SQL 评估都相同，那么可以省略用装饰的第二个函数.expression，SQLAlchemy 将在这两种情况下使用第一个函数。

3. 混合
- Mixin不仅是 SQLAlchemy 特有的，而且它们在与 ORM 模型结合使用时特别有用。很多时候可能会遇到这样的情况，有多个类（模型）需要相同的属性或相同的classmethod. 一个这样的例子是User下面的模型：

```python
class MixinAsDict:
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class MixinGetByUsername:
    username = Column(String(200), unique=True, nullable=True)

    @classmethod
    def get_by_username(cls, username):
        return session.query(cls).filter(cls.username == username).first()


class User(MixinAsDict, MixinGetByUsername, Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)

user = User(id=1, username="John")
print(user.as_dict())
# {'username': 'John', 'id': 1}
session.add(user)
session.commit()

john = User.get_by_username("John")
print(f"User: {john.username} with ID: {john.id}")
# User: John with ID: 1
```

- 在这个例子中，我们有 2 个Mixin类，User模型继承自这些类。首先 -MixinAsDict提供方法as_dict(self)，可用于获取dict模型的表示。另一个MixinGetByUsername提供username列和静态方法，用于按用户名查询用户。将这些函数定义为Mixins允许我们使它们可重用并将它们添加到其他模型中，而无需在任何地方复制粘贴相同的代码。

4. 使用元数据
- 有时可能需要访问表列名，检查表上的约束或检查列是否可以为空。所有这些都可以通过MetaData()类来完成：

```python
class Address(Base):
    __tablename__ = 'address'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=True)
    street = Column(String(50))

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    firstname = Column(String(50))
    lastname = Column(String(50))
    address = relationship(Address, backref='report')

Base.metadata.create_all(engine)

meta = Base.metadata  # Metadata()

for t in meta.sorted_tables:
    print(t.name)

# user
# address

print(meta.tables["user"].c)
# ['user.id', 'user.firstname', 'user.lastname']
print(meta.tables["user"].c["lastname"].type)
# VARCHAR(50)
print(meta.tables["user"].c["lastname"].nullable)
# True
print(meta.tables["address"].foreign_keys)
# {ForeignKey('user.id')}
print(meta.tables["address"].primary_key)
# PrimaryKeyConstraint(Column('id', Integer(), table=<address>, primary_key=True, nullable=False))
```

- 这里的重要部分是print代码片段底部的语句。它们中的每一个都演示了可以通过元数据对象访问的一些内容。这包括表名、列名、列类型、外键和主键以及其他约束。

5. 配置表
- 的某些数据库表可能需要更广泛的初始设置。例如 - 可能希望包含一些检查约束、索引或指定不同的架构：。

```python
class Card(Base):
    __tablename__ = 'card'
    __table_args__ = (
        CheckConstraint("created < valid_until", name="validity_check"),
        CheckConstraint("card_type ~* '^(debit|credit){1}$''", name="type_check"),
        Index("index", "id"),
        ForeignKeyConstraint(['id'], ['remote_table.id']),
        {'extend_existing': True, "schema": "default"},
    )

    id = Column(Integer, primary_key=True)
    created = Column(Date)
    valid_until = Column(Date)
    card_type = Column(String(50))
```

- 所有这些都可以使用__table_args__class 属性进行配置。在这里，我们设置了 2 个检查约束、1 个 ID 列索引和外键约束。我们还开启了自动表扩展，这意味着如果我们在创建该表后向该表添加列，那么它会被自动添加。最后，我们还指定该表属于哪个模式。

6. 使用自定义方言
- 每个数据库引擎都有一些可能想要使用的自定义功能。对于我 - 作为 PostgreSQL 用户 - 我想使用 PostgreSQL 拥有的一些自定义列类型。那么如何将它们与 SQLAlchemy 一起使用呢？

```python
from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID, INT4RANGE, NUMRANGE, JSON

engine = create_engine('postgresql+psycopg2://postgres:postgres@localhost/testdb', echo=True)

class Example(Base):
    __tablename__ = 'example'

    id = Column(Integer, primary_key=True)
    uuid = Column(UUID(as_uuid=True), unique=True, nullable=False, default=uuid4)
    int_range = Column(INT4RANGE)
    num_range = Column(NUMRANGE)
    pg_json = Column(JSON)
    pg_array = Column(postgresql.ARRAY(Integer), server_default='{}')


from psycopg2.extras import NumericRange

example = Example(
    uuid=uuid4(),
    int_range=NumericRange(1, 3),
    num_range=NumericRange(1, 3),
    pg_json={"key": "value"},
    pg_array=[1, 5, 7, 24, 74, 8],
)

print(session.query(Example).filter(Example.pg_array.contains([5])).scalar())
# SELECT * FROM example WHERE example.pg_array @> [5]

# <__main__.Example object at 0x7f2d600a4070>  # Object we previously inserted

print(session.query(Example).filter(Example.pg_json["key"].astext == "value").scalar())
# SELECT *
# FROM example
# WHERE (example.pg_json ->> 'key' = 'value'

# <__main__.Example object at 0x7f04dee05070>  # Object we previously inserted
```
- 以上示出了一个代码Example具有PostgreSQL表UUID，INT4RANGE，NUMRANGE，JSON和ARRAY列。所有这些以及更多内容都可以从sqlalchemy.dialects.postgresql. 创建包含这些类型值的行是不言自明的。但是，在查询它们时，将需要使用方言和类型特定的比较器，如上所示，以及 PostgreSQLARRAY类型和.contains比较器。对于像JSON这样的其他类型，只需将它们作为文本进行比较（使用.astext）。

7. 使用 PostgreSQL 进行全文搜索
而关于 PostgreSQL 特性的话题。使用tsqeury和进行全文搜索tsvector怎么样？我们也可以使用 SQLAchemy 做到这一点：

```python
class MixinSearch:

    @classmethod
    def fulltext_search(cls, session, search_string, field):
        return session.query(cls). \
            filter(func.to_tsvector('english', getattr(cls, field)).match(search_string, postgresql_regconfig='english')).all()

class Book(MixinSearch, Base):
    __tablename__ = 'book'

    id = Column(Integer, primary_key=True)
    title = Column(String(100))
    body = Column(Text)

book = Book(
    title="The Catcher in the Rye",
    body="""First page of the book..."""
)

success = Book.fulltext_search(session, "David & Copperfield", "body")
# SELECT *
# FROM book
# WHERE to_tsvector(english, book.body) @@ to_tsquery('english','David & Copperfield')
print(success)
# [<__main__.Book object at 0x7fdac5e44520>]
fail = Book.fulltext_search(session, "cat & dog", "body")
# SELECT *
# FROM book
# WHERE to_tsvector(english, book.body) @@ to_tsquery('english', 'cat & dog')
print(fail)
# []
```
- 我们再次为全文搜索创建Mixin类，因为这是许多模型可以使用的东西。这个Mixin有一个静态方法，它使用搜索字符串和列在 ( field) 中搜索。为了进行我们使用的实际搜索func.totsvector，我们将语言和引用传递给表列。在这一点上，我们将调用链接到.match函数，它实际上是to_tsqueryPostgreSQL 中的调用，我们将搜索字符串和搜索配置作为参数提供给它。从生成的 SQL 中我们可以看到 Python 代码确实生成了正确的 SQL 查询。

8. 跟踪行的最后更新
- 创建created_at或创建updated_at列是很常见的做法。这可以使用 SQLAlchemy 非常简单地完成：

```python
class Example(Base):
    __tablename__ = 'example'

    id = Column(Integer, primary_key=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    data = Column(String(100))


example = Example(
    data="Some data..."
)

row = session.query(Example).scalar()
print(row.updated_at)
# 10:13:14.001813+00:00

time.sleep(...)
row.data = "Some new data..."
session.add(row)
session.commit()

row = session.query(Example).scalar()
print(row.updated_at)
# 10:13:16.590945+00:00
```
- 因为updated_at只需要设置onupdate为func.now()which 将使得每次更新行时，此列将设置为当前时间戳。至于created_at列，可以省略onupdate参数，而是使用server_defaultwhich 设置创建行时调用的函数。

9. 自引用表
- 在数据库中具有递归/自我参照关系的情况并不少见-无论是经理人->雇员关系，树状结构还是某些物化路径。这个技巧展示了如何使用 SQLAlchemy 设置这种关系：

```python
class Node(Base):
    __tablename__ = 'node'
    id = Column(Integer, primary_key=True)
    parent_id = Column(Integer, ForeignKey('node.id'))
    data = Column(String(50))
    children = relationship("Node",
                            backref=backref('parent', remote_side=[id])
                            )

    def __str__(self, level=0):
        ret = f"{'    ' * level} {repr(self.data)} \n"
        for child in self.children:
            ret += child.__str__(level + 1)
        return ret

    def __repr__(self):
        return self.data


node = Node(
    data="Node 1",
    children=[
        Node(data="Node 2"),
        Node(
            data="Node 3",
            children=[
                Node(data="Node 5")
            ]
        ),
        Node(data="Node 4"),
    ]
)
rows = session.query(Node).all()
print(rows[0])
# 'Node 1'
#     'Node 2'
#     'Node 3'
#         'Node 5'
#     'Node 4'
print(rows[2])
# 'Node 3'
#     'Node 5'
```
- 对于这个例子，我们使用使用Node记录创建的树结构。每个节点都有 some data，对其父节点及其子节点列表的引用。作为一种方便的方法，我们还包括__str__并__repr__帮助我们更好地可视化树。如果对正常的一对多关系没问题，那么可以像处理任何非自引用关系那样进行操作。为了使其适用于双向关系，还需要包括backrefwith，remote_side=[id]如上所示。

10. 使用 Flask 绑定多个数据库
- 最后一个适用于所有Flask用户。如果需要连接到多个数据库 - 例如因为多个地理区域或多个数据源 - 那么可以使用SQLALCHEMY_BINDS指定额外的数据库绑定：

```python
# Config
SQLALCHEMY_DATABASE_URI = 'postgres+psycopg2://localhost/emea'  # Europe, the Middle East and Africa
SQLALCHEMY_BINDS = {
    'emea':     'postgres+psycopg2://localhost/emea',  # Europe, the Middle East and Africa
    'ap':       'mysqldb://localhost/ap',              # Asia Pacific
    'la':       'postgres+psycopg2://localhost/la',    # Latin America
}

# Models
class User(db.Model):
    __bind_key__ = 'emea'  # Declare to which database the model belongs to
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
```

- 在上面的代码片段中，我们通过设置SQLALCHEMY_DATABASE_URI和替代绑定来配置默认数据库SQLALCHEMY_BINDS。通过此配置，我们将可以使用上述所有数据库。接下来，我们设置__bind_key__一个表来引用其中一个绑定，这样每当我们与这个特定的表交互时，SQLAlchemy 就会知道要连接到哪个数据库。但是，如果需要连接到具有相同表/模式的多个数据库，可以使用多个引擎和会话 - 每个数据库一个，并根据需要在它们之间切换，如下所示：

```python
engine_emea   = create_engine(...)
engine_ap     = create_engine(...)
engine_la     = create_engine(...)

session_emea  = sessionmaker(bind=engine_emea)
session_ap    = sessionmaker(bind=engine_ap)
session_la    = sessionmaker(bind=engine_la)
```

11. 结论
希望这里显示的这些提示和技巧中至少有一些对有用，并且在下次需要使用 SQLAlchemy 时会让的生活更轻松一些。这篇文章绝对不是可以用 SQLAlchemy 做的所有很酷的事情的详尽列表，可以通过滚动浏览https://docs.sqlalchemy.org/en/13/core/index.html找到一堆有用的东西。


### 3.Tip:

#### java python aes 加解密互转

1.1 Java Code(Base64 from org.apache.commons.codec.binary.Base64)：

```java
public static String encrypt(String secretKey, String salt, String value) throws Exception {
        Cipher cipher = initCipher(secretKey, salt, Cipher.ENCRYPT_MODE);
        byte[] encrypted = cipher.doFinal(value.getBytes());
        return Base64.encodeBase64String(encrypted);
    }

    public static String decrypt(String secretKey, String salt, String encrypted) throws Exception {
        Cipher cipher = initCipher(secretKey, salt, Cipher.DECRYPT_MODE);
        byte[] original = cipher.doFinal(Base64.decodeBase64(encrypted));
        return new String(original);
    }

    private static Cipher initCipher(String secretKey, String salt, int mode) throws Exception {

        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");

        KeySpec spec = new PBEKeySpec(secretKey.toCharArray(), salt.getBytes(), 65536, 256);
        SecretKey tmp = factory.generateSecret(spec);
        SecretKeySpec skeySpec = new SecretKeySpec(tmp.getEncoded(), "AES");

        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
        cipher.init(mode, skeySpec, new IvParameterSpec(new byte[16]));
        return cipher;
    }

    public static void main(String[] args) throws Exception {
        String secretKey = "Secret";
        String fSalt = "tJHnN5b1i6wvXMwzYMRk";
        String plainText = "England";

        String cipherText = encrypt(secretKey, fSalt, plainText);
        System.out.println("Cipher: " + cipherText);
//      cipherText = "6peDTxE1xgLE4hTGg0PKTnuuhFC1Vftsd7NH9DF/7WM="; // Cipher from python
        String dcrCipherText = decrypt(secretKey, fSalt, cipherText);
        System.out.println(dcrCipherText);

    }
```

1.2 Python Code(version 3.6) & Pycrypto V2.6：

```python
import base64
import hashlib
import os

from Crypto.Cipher import AES

BS = 16
pad = lambda s: s + (BS - len(s) % BS) * chr(BS - len(s) % BS)

# unpad = lambda s: s[:-ord(s[len(s) - 1:])]
unpad = lambda s: s[0:-s[-1]]

def get_private_key(secretKey, salt):
    key = hashlib.pbkdf2_hmac('SHA256', secretKey.encode(), salt.encode(), 65536, 32)
    return key


def encrypt(message, salt, secretKey):
    private_key = get_private_key(secretKey, salt)
    message = pad(message)
    iv = os.urandom(BS)  # 128-bit IV
    cipher = AES.new(private_key, AES.MODE_CBC, iv, segment_size=256)
    return base64.b64encode(iv + cipher.encrypt(message))


def decrypt(enc, salt, secretKey):
    private_key = get_private_key(secretKey, salt)
    enc = base64.b64decode(enc)
    iv = enc[:BS]
    cipher = AES.new(private_key, AES.MODE_CBC, iv, segment_size=256)
    return unpad(cipher.decrypt(enc[BS:]))


secretKey = "Secret"
salt = "tJHnN5b1i6wvXMwzYMRk"
plainText = "England"
cipher = encrypt(plainText, salt, secretKey)
print("Cipher: " + bytes.decode(cipher))

# cipher = "0JrZdg9YBRshfTdr1d4zwQ==" # Cipher from java
decrypted = decrypt(cipher, salt, secretKey)
print("Decrypted " + bytes.decode(decrypted))
```

### 4.Share:

https://vimsky.com/zh-tw/examples/detail/python-attribute-sqlalchemy.dialects.postgresql.ARRAY.html
Python postgresql.ARRAY屬性代碼示例

https://zhuanlan.zhihu.com/p/32840472
flask_appbuilder使用过程中遇到的坑之一

https://www.jianshu.com/p/8427da16729a
Flask - SQLalchemy 之 lazy 属性

https://blog.csdn.net/qq_41118891/article/details/103711742
Python连接Mysql数据库——ModuleNotFoundError：No module named 'mysql'
