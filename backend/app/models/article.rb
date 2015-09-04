class Article < ActiveRecord::Base
  belongs_to :author

  validates :title, presence: true, length: { minimum: 3, maximum: 256 }, uniqueness: { case_sensitive: false }
  validates :content, presence: true
  validates :author, presence: true
end
