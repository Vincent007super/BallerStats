<?php
require_once '../config.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

try {
    // Get training recommendations based on actual database structure
    $sql = "SELECT rt.id, rt.player_id, rt.coach_id, rt.training_type, 
                   rt.description, rt.date_recommended, rt.status,
                   p.name as player_name, p.jersey_number,
                   c.name as coach_name 
            FROM recommended_trainings rt
            JOIN players p ON rt.player_id = p.id
            JOIN coaches c ON rt.coach_id = c.id
            ORDER BY rt.date_recommended DESC";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $trainings = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Get self reflections based on actual database structure
    $sql2 = "SELECT sr.id, sr.player_id, sr.reflection_text, 
                    sr.date_submitted, sr.game_id,
                    p.name as player_name, p.jersey_number,
                    g.date as game_date, g.opponent
             FROM self_reflections sr
             JOIN players p ON sr.player_id = p.id
             LEFT JOIN games g ON sr.game_id = g.id
             ORDER BY sr.date_submitted DESC";
             
    $stmt2 = $conn->prepare($sql2);
    $stmt2->execute();
    $reflections = $stmt2->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true, 
        'data' => [
            'trainings' => $trainings,
            'reflections' => $reflections
        ]
    ]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>