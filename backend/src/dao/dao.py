from src.dao.basedao import BaseDao
from src.dao.models import User, Category, Product


class UserDao(BaseDao):
    model = User

class CategoryDao(BaseDao):
    model = Category

class ProductDao(BaseDao):
    model = Product