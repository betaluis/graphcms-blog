# Setting up CMS

## Create a blank project on graphCMS

- Name the project
- Give it a description
- Choose the region
- Choose a plan (our case is the free version)
- Invite team members, or do it later.

## Set up schema

- Create a model
- Add display name
- This one will be named "Author"

### Add field to models

- Single line text
	- "Name" is the display name
	- Make it required

- Add image field
	- Called asset picker
	- Display name is "Photo"
	- Not required

- Multi line text
	- Bio is the name

### New Model (2)

**Category is the model**

Fields:
	- Name
		- Required
		- Unique
	- Slug
		- Required
		- Unique

**Third Model called Comment**

- Single line text
	- Name
	- Required
- Another single line text
	- Email
	- Required
- Multi line text
	- Comment is the name
	- Required


**Main model (4)**

This will be the post itself.

Name is Post
	- Single Line text - Title
		- Use as a title
		- Required
	- Slug - "Slug"
		- Required
	- Multi-line text
		- Excerpt is the name
		- Required
	- Rich text
		- Content
		- Enable embeds
		- Required
	- Image
		- asset picker - featured image
		- required
	- Boolean 
		- Featured Post
		- Required
	- Reference
		- Define relationship - Author
		- Two-way Ref
		- Allow multiple
		- Read/write
	- Add another reference for category
		- Two-way
		- Allow multiple per post and post per category

Last step is to create one post in each model and that's all we'll need to start coding up the whole project.