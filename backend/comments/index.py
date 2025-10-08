'''
Business: API для управления комментариями к историям
Args: event с httpMethod, body, queryStringParameters; context с request_id
Returns: HTTP ответ с комментариями или статусом операции
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters', {}) or {}
            story_id = params.get('story_id')
            
            if story_id:
                cursor.execute(
                    "SELECT id, story_id, author_name, comment_text, created_at FROM comments WHERE story_id = %s ORDER BY created_at DESC",
                    (story_id,)
                )
            else:
                cursor.execute(
                    "SELECT id, story_id, author_name, comment_text, created_at FROM comments ORDER BY created_at DESC"
                )
            
            comments = cursor.fetchall()
            comments_list = [dict(row) for row in comments]
            
            for comment in comments_list:
                if comment.get('created_at'):
                    comment['created_at'] = comment['created_at'].isoformat()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'comments': comments_list}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            story_id = body_data.get('story_id')
            author_name = body_data.get('author_name')
            comment_text = body_data.get('comment_text')
            
            if not all([story_id, author_name, comment_text]):
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Missing required fields'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "INSERT INTO comments (story_id, author_name, comment_text) VALUES (%s, %s, %s) RETURNING id, story_id, author_name, comment_text, created_at",
                (story_id, author_name, comment_text)
            )
            conn.commit()
            
            new_comment = dict(cursor.fetchone())
            if new_comment.get('created_at'):
                new_comment['created_at'] = new_comment['created_at'].isoformat()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'comment': new_comment}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
